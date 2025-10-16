// -- IMPORTS

import { Either, left, right } from '@core/either';
import { QuestionRepository } from '@domain/forum/application/repositories/question_repository';
import { NotAllowedError } from '../../../../core/errors/not_allowed_error';
import { ResourceNotFoundError } from '../../../../core/errors/resource_not_found_error';

// -- TYPES

interface DeleteQuestionUseCaseRequest
{
    authorId: string;
    questionId: string;
}

type DeleteQuestionUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {}>;

export class DeleteQuestionUseCase
{
    // -- CONSTRUCTOR

    constructor(
        private questionRepository: QuestionRepository
        )
    {
    }

    // -- OPERATIONS

    async execute(
        {
            authorId,
            questionId
        }: DeleteQuestionUseCaseRequest
        ): Promise<DeleteQuestionUseCaseResponse>
    {
        const question = await this.questionRepository.findById( questionId );

        if ( !question )
        {
            return left( new ResourceNotFoundError() );
        }

        if ( authorId !== question.authorId.toString() )
        {
            return left( new NotAllowedError());
        }

        await this.questionRepository.delete( question );

        return right(
            {
            }
            );
    }
}