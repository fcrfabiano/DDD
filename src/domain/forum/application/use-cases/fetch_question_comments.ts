// -- IMPORTS

import { Either, right } from '@core/either';
import { QuestionCommentsRepository } from '@domain/forum/application/repositories/question_comments_repository';
import { QuestionComment } from '@domain/forum/enterprise/entities/question_comment';

// -- TYPES

interface FetchQuestionCommentsUseCaseRequest
{
    questionId: string;
    page: number;
}

type FetchQuestionCommentsUseCaseResponse = Either<null, { questionComments: QuestionComment[] }>;

export class FetchQuestionCommentsUseCase
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
            questionId,
            page
        }: FetchQuestionCommentsUseCaseRequest
        ): Promise<FetchQuestionCommentsUseCaseResponse>
    {
        const questionComments = await this.questionCommentsRepository.findManyByQuestionId( questionId, { page } );

        return right(
            {
                questionComments
            }
            );
    }
}