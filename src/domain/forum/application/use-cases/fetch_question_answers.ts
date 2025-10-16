// -- IMPORTS

import { Either, right } from '@core/either';
import { AnswersRepository } from '@domain/forum/application/repositories/answers_repository';
import { Answer } from '@domain/forum/enterprise/entities/answer';

// -- TYPES

interface FetchQuestionAnswersUseCaseRequest
{
    questionId: string;
    page: number;
}

type FetchQuestionAnswersUseCaseResponse = Either<null, { answers: Answer[] }>;

export class FetchQuestionAnswersUseCase
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
            questionId,
            page
        }: FetchQuestionAnswersUseCaseRequest
        ): Promise<FetchQuestionAnswersUseCaseResponse>
    {
        const answers = await this.answerRepository.findManyByQuestionId( questionId, { page } );

        return right(
            {
                answers
            }
            );
    }
}