// -- IMPORTS

import { Question } from '@domain/forum/enterprise/entities/question';
import { QuestionRepository } from '@domain/forum/application/repositories/question_repository';
import { Either, left, right } from '@core/either';
import { ResourceNotFoundError } from '../../../../core/errors/resource_not_found_error';

// -- TYPES

interface GetQuestionBySlugRequest
{
    slug: string;
}

type GetQuestionBySlugResponse = Either<ResourceNotFoundError, { question: Question; }>;

export class GetQuestionBySlugUseCase
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
            slug
        }: GetQuestionBySlugRequest
        ): Promise<GetQuestionBySlugResponse>
    {
        const question = await this.questionRepository.findBySlug( slug );

        if ( !question )
        {
            return left( new ResourceNotFoundError() );
        }

        return right(
            {
                question
            }
            );
    }
}