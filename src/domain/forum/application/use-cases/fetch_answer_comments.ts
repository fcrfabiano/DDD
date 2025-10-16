// -- IMPORTS

import { Either, right } from '@core/either';
import { AnswerCommentsRepository } from '@domain/forum/application/repositories/answer_comments_repository';
import { AnswerComment } from '@domain/forum/enterprise/entities/answer_comment';

// -- TYPES

interface FetchAnswerCommentsUseCaseRequest
{
    answerId: string;
    page: number;
}

type FetchAnswerCommentsUseCaseResponse = Either<null, { answerComments: AnswerComment[] }>;

export class FetchAnswerCommentsUseCase
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
            answerId,
            page
        }: FetchAnswerCommentsUseCaseRequest
        ): Promise<FetchAnswerCommentsUseCaseResponse>
    {
        const answerComments = await this.answerCommentsRepository.findManyByAnswerId( answerId, { page } );

        return right(
            {
                answerComments
            }
            );
    }
}