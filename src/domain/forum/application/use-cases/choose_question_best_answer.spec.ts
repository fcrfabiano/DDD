// -- IMPORTS

import { AnswersRepository } from '@domain/forum/application/repositories/answers_repository';
import { Answer } from '@domain/forum/enterprise/entities/answer';
import { makeAnswer } from 'test/factories/make_answer';
import { makeQuestion } from 'test/factories/make_question';
import { InMemoryAnswersRepository } from 'test/repositories/in_memory_answers_repository';
import { InMemoryQuestionsRepository } from 'test/repositories/in_memory_questions_repository';
import { ChooseQuestionBestAnswerUseCase } from './choose_question_best_answer';
import { UniqueEntityId } from '@core/entities/unique_entity_id';
import { NotAllowedError } from '../../../../core/errors/not_allowed_error';
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in_memory_answer_attachments_repository';
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in_memory_question_attachments_repository';

// -- VARIABLES

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let inMemoryQuestionRepository: InMemoryQuestionsRepository;
let sut: ChooseQuestionBestAnswerUseCase;

// -- STATEMENTS

describe(
    'Choose question best answer',
    () =>
    {
        beforeEach(
            () =>
            {
                inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository();
                inMemoryAnswersRepository = new InMemoryAnswersRepository( inMemoryAnswerAttachmentsRepository );
                inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository();
                inMemoryQuestionRepository = new InMemoryQuestionsRepository( inMemoryQuestionAttachmentsRepository );
                sut = new ChooseQuestionBestAnswerUseCase(
                    inMemoryQuestionRepository,
                    inMemoryAnswersRepository
                    );
            }
            );

        it(
            'Should be able to choose the question best answer',
            async () =>
            {
                const question = makeQuestion();
                const answer = makeAnswer(
                    {
                        questionId: question.id
                    },
                    new UniqueEntityId( 'answer-1' )
                    );

                await inMemoryQuestionRepository.create( question );
                await inMemoryAnswersRepository.create( answer );

                await sut.execute(
                    {
                        answerId: answer.id.toString(),
                        authorId: question.authorId.toString()
                    }
                    );
        
                expect( inMemoryQuestionRepository.items[ 0 ].bestAnswerId ).toEqual( answer.id );
            }
            );

        it(
            'Should not be able to choose another user question best answer',
            async () =>
            {
                const question = makeQuestion(
                    {
                        authorId: new UniqueEntityId( 'author-1' )
                    }
                    );
                const answer = makeAnswer(
                    {
                        questionId: question.id
                    },
                    new UniqueEntityId( 'answer-1' )
                    );

                await inMemoryQuestionRepository.create( question );
                await inMemoryAnswersRepository.create( answer );

                const result = await sut.execute(
                    {
                        answerId: answer.id.toString(),
                        authorId: 'author-2'
                    }
                    );
                expect( result.isLeft() ).toBe( true );
                expect( result.value ).toBeInstanceOf( NotAllowedError );
            }
            );
    }
    );
