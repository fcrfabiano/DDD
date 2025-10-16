// -- IMPORTS

import { makeAnswerComment } from 'test/factories/make_answer_comment';
import { DeleteAnswerCommentUseCase } from './delete_answer_comment';
import { UniqueEntityId } from '@core/entities/unique_entity_id';
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in_memory_answer_comments_repository';
import { NotAllowedError } from '../../../../core/errors/not_allowed_error';

// -- VARIABLES

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: DeleteAnswerCommentUseCase;

// -- STATEMENTS

describe(
    'Delete Answer Comment',
    () =>
    {
        beforeEach(
            () =>
            {
                inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
                sut = new DeleteAnswerCommentUseCase(
                    inMemoryAnswerCommentsRepository
                    );
            }
            );

        it(
            'Should be able to delete a answer comment',
            async () =>
            {
                const answerComment = makeAnswerComment();

                await inMemoryAnswerCommentsRepository.create( answerComment );

                await sut.execute(
                    {
                        authorId: answerComment.authorId.toString(),
                        answerCommentId: answerComment.id.toString()
                    }
                    );
        
                expect( inMemoryAnswerCommentsRepository.items ).toHaveLength( 0 );
            }
            );

        it(
            'Should not be able to delete another user answer comment',
            async () =>
            {
                const answerComment = makeAnswerComment(
                    {
                        authorId: new UniqueEntityId( 'author-1' )
                    }
                    );

                await inMemoryAnswerCommentsRepository.create( answerComment );

                const result = await sut.execute(
                    {
                        authorId: 'author-2',
                        answerCommentId: answerComment.id.toString()
                    }
                    );
                expect( result.isLeft() ).toBe( true );
                expect( result.value ).toBeInstanceOf( NotAllowedError );
            }
            );
    }
    );
