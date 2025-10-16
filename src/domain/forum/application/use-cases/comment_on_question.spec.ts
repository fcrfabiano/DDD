// -- IMPORTS

import { makeQuestion } from 'test/factories/make_question';
import { InMemoryQuestionsRepository } from 'test/repositories/in_memory_questions_repository';
import { CommentOnQuestionUseCase } from './comment_on_question';
import { UniqueEntityId } from '@core/entities/unique_entity_id';
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in_memory_question_comments_repository';
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in_memory_question_attachments_repository';

// -- VARIABLES

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let inMemoryQuestionRepository: InMemoryQuestionsRepository;
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: CommentOnQuestionUseCase;

// -- STATEMENTS

describe(
    'Comment on Question',
    () =>
    {
        beforeEach(
            () =>
            {
                inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository();
                inMemoryQuestionRepository = new InMemoryQuestionsRepository( inMemoryQuestionAttachmentsRepository );
                inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository();
                sut = new CommentOnQuestionUseCase(
                    inMemoryQuestionRepository,
                    inMemoryQuestionCommentsRepository
                    );
            }
            );

        it(
            'Should be able to comment on question',
            async () =>
            {
                const question = makeQuestion();

                await inMemoryQuestionRepository.create( question );

                await sut.execute(
                    {
                        authorId: question.authorId.toString(),
                        questionId: question.id.toString(),
                        content: 'Comentário teste'
                    }
                    );
        
                expect( inMemoryQuestionCommentsRepository.items[ 0 ].content ).toEqual( 'Comentário teste' );
            }
            );
    }
    );
