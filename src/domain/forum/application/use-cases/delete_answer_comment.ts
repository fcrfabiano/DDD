// -- IMPORTS

import { Either, left, right } from '@core/either';
import { AnswerCommentsRepository } from '@domain/forum/application/repositories/answer_comments_repository';
import { ResourceNotFoundError } from '../../../../core/errors/resource_not_found_error';
import { NotAllowedError } from '../../../../core/errors/not_allowed_error';

// -- TYPES

interface DeleteAnswerCommentUseCaseRequest
{
    authorId: string;
    answerCommentId: string;
}

type DeleteAnswerCommentUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {}>

export class DeleteAnswerCommentUseCase
{
    // -- CONSTRUCTOR

    constructor(
        private answerCommentsRepository: AnswerCommentsRepository
        )
    {
    }

    // -- OPERATIONS

    async execute(
        {
            authorId,
            answerCommentId
        }: DeleteAnswerCommentUseCaseRequest
        ): Promise<DeleteAnswerCommentUseCaseResponse>
    {
        const answerComment = await this.answerCommentsRepository.findById( answerCommentId );

        if ( !answerComment )
        {
            return left( new ResourceNotFoundError() );
        }

        if ( authorId !== answerComment.authorId.toString() )
        {
            return left( new NotAllowedError() );
        }

        await this.answerCommentsRepository.delete( answerComment );

        return right(
            {
            }
            );
    }
}