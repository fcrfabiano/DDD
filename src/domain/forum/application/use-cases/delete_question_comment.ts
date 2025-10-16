// -- IMPORTS

import { Either, left, right } from '@core/either';
import { QuestionCommentsRepository } from '@domain/forum/application/repositories/question_comments_repository';
import { ResourceNotFoundError } from '../../../../core/errors/resource_not_found_error';
import { NotAllowedError } from '../../../../core/errors/not_allowed_error';

// -- TYPES

interface DeleteQuestionCommentUseCaseRequest
{
    authorId: string;
    questionCommentId: string;
}

type DeleteQuestionCommentUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {}>;

export class DeleteQuestionCommentUseCase
{
    // -- CONSTRUCTOR

    constructor(
        private questionCommentsRepository: QuestionCommentsRepository
        )
    {
    }

    // -- OPERATIONS

    async execute(
        {
            authorId,
            questionCommentId
        }: DeleteQuestionCommentUseCaseRequest
        ): Promise<DeleteQuestionCommentUseCaseResponse>
    {
        const questionComment = await this.questionCommentsRepository.findById( questionCommentId );

        if ( !questionComment )
        {
            return left( new ResourceNotFoundError() );
        }

        if ( authorId !== questionComment.authorId.toString() )
        {
            return left( new NotAllowedError() );
        }

        await this.questionCommentsRepository.delete( questionComment );

        return right(
            {
            }
            );
    }
}