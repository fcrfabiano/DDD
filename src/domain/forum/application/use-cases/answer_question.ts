// -- IMPORTS

import { UniqueEntityId } from '@core/entities/unique_entity_id';
import { Answer } from '@domain/forum/enterprise/entities/answer';
import { Instructor } from '@domain/forum/enterprise/entities/instructor';
import { Question } from '@domain/forum/enterprise/entities/question';
import { AnswersRepository } from '@domain/forum/application/repositories/answers_repository';
import { Either, right } from '@core/either';
import { AnswerAttachment } from '@domain/forum/enterprise/entities/answer_attachment';
import { AnswerAttachmentList } from '@domain/forum/enterprise/entities/answer_attachment_list';

// -- TYPES

interface AnswerQuestionUseCaseRequest
{
    instructorId: string;
    questionId: string;
    content: string;
    attachmentsIds: string[];
}

type AnswerQuestionUseCaseResponse = Either<null, { answer: Answer }>;

export class AnswerQuestionUseCase
{
    // -- CONSTRUCTOR

    constructor(
        private answersRepository: AnswersRepository
        )
    {
    }

    // -- OPERATIONS

    async execute(
        {
            instructorId,
            questionId,
            content,
            attachmentsIds
        }: AnswerQuestionUseCaseRequest
        ): Promise<AnswerQuestionUseCaseResponse>
    {
        const answer = Answer.create(
            {
                content,
                authorId: new UniqueEntityId( instructorId ),
                questionId: new UniqueEntityId( questionId )
            }
            );
            
        const answerAttachments = [];
    
        for ( let attachmentId of attachmentsIds )
        {
            answerAttachments.push(
                AnswerAttachment.create(
                    {
                        attachmentId: new UniqueEntityId( attachmentId ),
                        answerId: answer.id
                    }
                    )
                );
        }

        answer.attachments = new AnswerAttachmentList( answerAttachments );

        await this.answersRepository.create( answer );

        return right(
            {
                answer
            }
            );
    }
}