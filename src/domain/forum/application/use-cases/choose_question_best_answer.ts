// -- IMPORTS

import { Question } from '@domain/forum/enterprise/entities/question';
import { QuestionRepository } from '@domain/forum/application/repositories/question_repository';
import { AnswersRepository } from '../repositories/answers_repository';
import { Either, left, right } from '@core/either';
import { ResourceNotFoundError } from '../../../../core/errors/resource_not_found_error';
import { NotAllowedError } from '../../../../core/errors/not_allowed_error';

// -- TYPES

interface ChooseQuestionBestAnswerUseCaseRequest
{
    authorId: string;
    answerId: string;
}

type ChooseQuestionBestAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, { question: Question; }>;

export class ChooseQuestionBestAnswerUseCase
{
    // -- CONSTRUCTOR

    constructor(
        private questionRepository: QuestionRepository,
        private answersRepository: AnswersRepository
        )
    {
    }

    // -- OPERATIONS

    async execute(
        {
            authorId,
            answerId
        }: ChooseQuestionBestAnswerUseCaseRequest
        ): Promise<ChooseQuestionBestAnswerUseCaseResponse>
    {
        const answer = await this.answersRepository.findById( answerId );

        if ( !answer )
        {
            return left( new ResourceNotFoundError() );
        }

        const question = await this.questionRepository.findById( answer.questionId.toString() );

        if ( !question )
        {
            return left( new ResourceNotFoundError() );
        }

        if ( question.authorId.toString() !== authorId )
        {
            return left( new NotAllowedError() );
        }

        question.bestAnswerId = answer.id;

        await this.questionRepository.save( question );

        return right(
            {
                question
            }
            );
    }
}