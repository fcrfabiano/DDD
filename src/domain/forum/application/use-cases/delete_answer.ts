// -- IMPORTS

import { Either, left, right } from '@core/either';
import { AnswersRepository } from '@domain/forum/application/repositories/answers_repository';
import { NotAllowedError } from '../../../../core/errors/not_allowed_error';
import { ResourceNotFoundError } from '../../../../core/errors/resource_not_found_error';

// -- TYPES

interface DeleteAnswerUseCaseRequest
{
    authorId: string;
    answerId: string;
}

type DeleteAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {}>;

export class DeleteAnswerUseCase
{
    // -- CONSTRUCTOR

    constructor(
        private answerRepository: AnswersRepository
        )
    {
    }

    // -- OPERATIONS

    async execute(
        {
            authorId,
            answerId
        }: DeleteAnswerUseCaseRequest
        ): Promise<DeleteAnswerUseCaseResponse>
    {
        const question = await this.answerRepository.findById( answerId );

        if ( !question )
        {
            return left( new ResourceNotFoundError() );
        }

        if ( authorId !== question.authorId.toString() )
        {
            return left( new NotAllowedError() );
        }

        await this.answerRepository.delete( question );

        return right(
            {
            }
            );
    }
}