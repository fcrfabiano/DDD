// -- IMPORTS

import { AnswerComment } from '@domain/forum/enterprise/entities/answer_comment';
import { AnswersRepository } from '../repositories/answers_repository';
import { AnswerCommentsRepository } from '../repositories/answer_comments_repository';
import { UniqueEntityId } from '@core/entities/unique_entity_id';
import { Either, left, right } from '@core/either';
import { ResourceNotFoundError } from '../../../../core/errors/resource_not_found_error';

// -- TYPES

interface CommentOnAnswerUseCaseRequest
{
    authorId: string;
    answerId: string;
    content: string;
}

type CommentOnAnswerUseCaseResponse = Either<ResourceNotFoundError, { answerComment: AnswerComment; }>;

export class CommentOnAnswerUseCase
{
    // -- CONSTRUCTOR

    constructor(
        private answersRepository: AnswersRepository,
        private answerCommentsRepository: AnswerCommentsRepository
        )
    {
    }

    // -- OPERATIONS

    async execute(
        {
            authorId,
            content,
            answerId
        }: CommentOnAnswerUseCaseRequest
        ): Promise<CommentOnAnswerUseCaseResponse>
    {
        const answer = await this.answersRepository.findById( answerId );

        if ( !answer )
        {
            return left( new ResourceNotFoundError() );
        }

        const answerComment = AnswerComment.create(
            {
                authorId: new UniqueEntityId( authorId ),
                answerId: new UniqueEntityId( answerId ),
                content
            }
            );

        await this.answerCommentsRepository.create( answerComment );

        return right(
            {
                answerComment
            }
            );
    }
}