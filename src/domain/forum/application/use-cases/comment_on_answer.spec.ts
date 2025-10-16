// -- IMPORTS

import { makeAnswer } from 'test/factories/make_answer';
import { InMemoryAnswersRepository } from 'test/repositories/in_memory_answers_repository';
import { CommentOnAnswerUseCase } from './comment_on_answer';
import { UniqueEntityId } from '@core/entities/unique_entity_id';
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in_memory_answer_comments_repository';
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in_memory_answer_attachments_repository';

// -- VARIABLES

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswerRepository: InMemoryAnswersRepository;
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: CommentOnAnswerUseCase;

// -- STATEMENTS

describe(
    'Comment on Answer',
    () =>
    {
        beforeEach(
            () =>
            {
                inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository();
                inMemoryAnswerRepository = new InMemoryAnswersRepository( inMemoryAnswerAttachmentsRepository );
                inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
                sut = new CommentOnAnswerUseCase(
                    inMemoryAnswerRepository,
                    inMemoryAnswerCommentsRepository
                    );
            }
            );

        it(
            'Should be able to comment on answer',
            async () =>
            {
                const answer = makeAnswer();

                await inMemoryAnswerRepository.create( answer );

                await sut.execute(
                    {
                        authorId: answer.authorId.toString(),
                        answerId: answer.id.toString(),
                        content: 'Comentário teste'
                    }
                    );
        
                expect( inMemoryAnswerCommentsRepository.items[ 0 ].content ).toEqual( 'Comentário teste' );
            }
            );
    }
    );
