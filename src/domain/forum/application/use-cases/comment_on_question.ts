// -- IMPORTS

import { QuestionComment } from '@domain/forum/enterprise/entities/question_comment';
import { QuestionRepository } from '../repositories/question_repository';
import { QuestionCommentsRepository } from '../repositories/question_comments_repository';
import { UniqueEntityId } from '@core/entities/unique_entity_id';
import { Either, left, right } from '@core/either';
import { ResourceNotFoundError } from '../../../../core/errors/resource_not_found_error';

// -- TYPES

interface CommentOnQuestionUseCaseRequest
{
    authorId: string;
    questionId: string;
    content: string;
}

type CommentOnQuestionUseCaseResponse = Either<ResourceNotFoundError, { questionComment: QuestionComment; }>;

export class CommentOnQuestionUseCase
{
    // -- CONSTRUCTOR

    constructor(
        private questionsRepository: QuestionRepository,
        private questionCommentsRepository: QuestionCommentsRepository
        )
    {
    }

    // -- OPERATIONS

    async execute(
        {
            authorId,
            content,
            questionId
        }: CommentOnQuestionUseCaseRequest
        ): Promise<CommentOnQuestionUseCaseResponse>
    {
        const question = await this.questionsRepository.findById( questionId );

        if ( !question )
        {
            return left( new ResourceNotFoundError() );
        }

        const questionComment = QuestionComment.create(
            {
                authorId: new UniqueEntityId( authorId ),
                questionId: new UniqueEntityId( questionId ),
                content
            }
            );

        await this.questionCommentsRepository.create( questionComment );

        return right(
            {
                questionComment
            }
            );
    }
}