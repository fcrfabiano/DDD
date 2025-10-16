// -- IMPORTS

import { UniqueEntityId } from '@core/entities/unique_entity_id';
import { Question } from '@domain/forum/enterprise/entities/question';
import { QuestionRepository } from '@domain/forum/application/repositories/question_repository';
import { Either, right } from '@core/either';
import { QuestionAttachment } from '@domain/forum/enterprise/entities/question_attachment';
import { QuestionAttachmentList } from '@domain/forum/enterprise/entities/question_attachment_list';

// -- TYPES

interface CreateQuestionUseCaseRequest
{
    authorId: string;
    title: string;
    content: string;
    attachmentsIds: string[];
}

type CreateQuestionUseCaseResponse = Either<null, { question: Question; }>;

export class CreateQuestionUseCase
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
            title,
            content,
            attachmentsIds
        }: CreateQuestionUseCaseRequest
        ): Promise<CreateQuestionUseCaseResponse>
    {
        const question = Question.create(
            {
                authorId: new UniqueEntityId( authorId ),
                title,
                content
            }
            );

        const questionAttachments = [];
    
        for ( let attachmentId of attachmentsIds )
        {
            questionAttachments.push(
                QuestionAttachment.create(
                    {
                        attachmentId: new UniqueEntityId( attachmentId ),
                        questionId: question.id
                    }
                    )
                );
        }

        question.attachments = new QuestionAttachmentList( questionAttachments );

        await this.questionRepository.create( question );

        return right(
            {
                question
            }
            );
    }
}