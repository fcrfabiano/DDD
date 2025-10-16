// -- IMPORTS

import { Either, right } from '@core/either';
import { QuestionRepository } from '@domain/forum/application/repositories/question_repository';
import { Question } from '@domain/forum/enterprise/entities/question';

// -- TYPES

interface FetchRecentQuestionsUseCaseRequest
{
    page: number;
}

type FetchRecentQuestionsUseCaseResponse = Either<null, { questions: Question[]; }>;

export class FetchRecentQuestionsUseCase
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
            page
        }: FetchRecentQuestionsUseCaseRequest
        ): Promise<FetchRecentQuestionsUseCaseResponse>
    {
        const questions = await this.questionRepository.findManyRecent(
            {
                page
            }
            );

        return right(
            {
                questions
            }
            );
    }
}