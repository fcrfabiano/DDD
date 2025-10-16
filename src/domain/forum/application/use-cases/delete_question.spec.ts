// -- IMPORTS

import { UniqueEntityId } from '@core/entities/unique_entity_id';
import { DeleteQuestionUseCase } from './delete_question';
import { QuestionRepository } from '@domain/forum/application/repositories/question_repository';
import { Question } from '@domain/forum/enterprise/entities/question';
import { makeQuestion } from 'test/factories/make_question';
import { InMemoryQuestionsRepository } from 'test/repositories/in_memory_questions_repository';
import { NotAllowedError } from '../../../../core/errors/not_allowed_error';
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in_memory_question_attachments_repository';
import { makeQuestionAttachment } from 'test/factories/make_question_attachment';

// -- VARIABLES

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let sut: DeleteQuestionUseCase;

// -- STATEMENTS

describe(
    'Delete Question',
    () =>
    {
        beforeEach(
            () =>
            {
                inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository();
                inMemoryQuestionsRepository = new InMemoryQuestionsRepository( inMemoryQuestionAttachmentsRepository );
                sut = new DeleteQuestionUseCase( inMemoryQuestionsRepository );
            }
            );

        it(
            'Should be able to delete a question',
            async () =>
            {
                const newQuestion = makeQuestion(
                    {
                        authorId: new UniqueEntityId( 'author-1' )
                    },
                    new UniqueEntityId( 'question-1' )
                    );

                await inMemoryQuestionsRepository.create( newQuestion );

                inMemoryQuestionAttachmentsRepository.items.push(
                    makeQuestionAttachment(
                        {
                            questionId: newQuestion.id,
                            attachmentId: new UniqueEntityId( '1' )
                        }
                        ),
                    makeQuestionAttachment(
                        {
                            questionId: newQuestion.id,
                            attachmentId: new UniqueEntityId( '2' )
                        }
                        )
                    );

                await sut.execute(
                    {
                        questionId: 'question-1',
                        authorId: 'author-1'
                    }
                    );
        
                expect( inMemoryQuestionsRepository.items ).toHaveLength( 0 );
                expect( inMemoryQuestionAttachmentsRepository.items ).toHaveLength( 0 );
            }
            );

        it(
            'Should not be able to delete a question from another user',
            async () =>
            {
                const newQuestion = makeQuestion(
                    {
                        authorId: new UniqueEntityId( 'author-1' )
                    },
                    new UniqueEntityId( 'question-1' )
                    );

                await inMemoryQuestionsRepository.create( newQuestion );
                
                const result = await sut.execute(
                    {
                        questionId: 'question-1',
                        authorId: 'author-2'
                    }
                    );

                expect( result.isLeft() ).toBe( true );
                expect( result.value ).toBeInstanceOf( NotAllowedError );
            }
            );
    }
    );
