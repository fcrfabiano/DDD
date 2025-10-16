// -- IMPORTS

import { makeQuestionComment } from 'test/factories/make_question_comment';
import { DeleteQuestionCommentUseCase } from './delete_question_comment';
import { UniqueEntityId } from '@core/entities/unique_entity_id';
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in_memory_question_comments_repository';
import { NotAllowedError } from '../../../../core/errors/not_allowed_error';

// -- VARIABLES

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: DeleteQuestionCommentUseCase;

// -- STATEMENTS

describe(
    'Delete Question Comment',
    () =>
    {
        beforeEach(
            () =>
            {
                inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository();
                sut = new DeleteQuestionCommentUseCase(
                    inMemoryQuestionCommentsRepository
                    );
            }
            );

        it(
            'Should be able to delete a question comment',
            async () =>
            {
                const questionComment = makeQuestionComment();

                await inMemoryQuestionCommentsRepository.create( questionComment );

                await sut.execute(
                    {
                        authorId: questionComment.authorId.toString(),
                        questionCommentId: questionComment.id.toString()
                    }
                    );
        
                expect( inMemoryQuestionCommentsRepository.items ).toHaveLength( 0 );
            }
            );

        it(
            'Should not be able to delete another user question comment',
            async () =>
            {
                const questionComment = makeQuestionComment(
                    {
                        authorId: new UniqueEntityId( 'author-1' )
                    }
                    );

                await inMemoryQuestionCommentsRepository.create( questionComment );

                const result = await sut.execute(
                    {
                        authorId: 'author-2',
                        questionCommentId: questionComment.id.toString()
                    }
                    );

                expect( result.isLeft() ).toBe( true );
                expect( result.value ).toBeInstanceOf( NotAllowedError );
            }
            );
    }
    );
