// -- IMPORTS

import { QuestionRepository } from '@domain/forum/application/repositories/question_repository';
import { Question } from '@domain/forum/enterprise/entities/question';
import { ResourceNotFoundError } from '../../../../core/errors/resource_not_found_error';
import { NotAllowedError } from '../../../../core/errors/not_allowed_error';
import { Either, left, right } from '@core/either';
import { QuestionAttachmentRepository } from '../repositories/question_attachment_repository';
import { QuestionAttachmentList } from '@domain/forum/enterprise/entities/question_attachment_list';
import { QuestionAttachment } from '@domain/forum/enterprise/entities/question_attachment';
import { UniqueEntityId } from '@core/entities/unique_entity_id';

// -- TYPES

interface EditQuestionUseCaseRequest
{
    authorId: string;
    questionId: string;
    title: string;
    content: string;
    attachmentsIds: string[];
}

type EditQuestionUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, { question: Question }>;

export class EditQuestionUseCase
{
    // -- CONSTRUCTOR

    constructor(
        private questionRepository: QuestionRepository,
        private questionAttachmentRepository: QuestionAttachmentRepository
        )
    {
    }

    // -- OPERATIONS

    async execute(
        {
            authorId,
            questionId,
            title,
            content,
            attachmentsIds
        }: EditQuestionUseCaseRequest
        ): Promise<EditQuestionUseCaseResponse>
    {
        const question = await this.questionRepository.findById( questionId );

        if ( !question )
        {
            return left( new ResourceNotFoundError() );
        }

        if ( authorId !== question.authorId.toString() )
        {
            return left( new NotAllowedError() );
        }

        const currentQuestionAttachments = await this.questionAttachmentRepository.findManyByQuestionId( questionId );
        const questionAttachmentList = new QuestionAttachmentList( currentQuestionAttachments );
        const questionAttachments = [];

        for ( let attachmendId of attachmentsIds )
        {
            questionAttachments.push(
                QuestionAttachment.create(
                    {
                        attachmentId: new UniqueEntityId( attachmendId ),
                        questionId: new UniqueEntityId( questionId )
                    }
                    )
                );
        }

        questionAttachmentList.update( questionAttachments );

        question.title = title;
        question.content = content;
        question.attachments = questionAttachmentList;

        await this.questionRepository.save( question );

        return right(
            {
                question
            }
            );
    }
}