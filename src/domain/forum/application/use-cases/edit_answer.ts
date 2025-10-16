// -- IMPORTS

import { Either, left, right } from '@core/either';
import { AnswersRepository } from '@domain/forum/application/repositories/answers_repository';
import { Answer } from '@domain/forum/enterprise/entities/answer';
import { ResourceNotFoundError } from '../../../../core/errors/resource_not_found_error';
import { NotAllowedError } from '../../../../core/errors/not_allowed_error';
import { AnswerAttachmentRepository } from '../repositories/answer_attachment_repository';
import { AnswerAttachmentList } from '@domain/forum/enterprise/entities/answer_attachment_list';
import { AnswerAttachment } from '@domain/forum/enterprise/entities/answer_attachment';
import { UniqueEntityId } from '@core/entities/unique_entity_id';

// -- TYPES

interface EditAnswerUseCaseRequest
{
    authorId: string;
    answerId: string;
    content: string;
    attachmentsIds: string[];
}

type EditAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, { answer: Answer; }>;

export class EditAnswerUseCase
{
    // -- CONSTRUCTOR

    constructor(
        private answerRepository: AnswersRepository,
        private answerAttachmentRepository: AnswerAttachmentRepository
        )
    {
    }

    // -- OPERATIONS

    async execute(
        {
            authorId,
            answerId,
            content,
            attachmentsIds
        }: EditAnswerUseCaseRequest
        ): Promise<EditAnswerUseCaseResponse>
    {
        const answer = await this.answerRepository.findById( answerId );

        if ( !answer )
        {
            return left( new ResourceNotFoundError() );
        }

        if ( authorId !== answer.authorId.toString() )
        {
            return left( new NotAllowedError() );
        }

        const currentAnswerAttachments = await this.answerAttachmentRepository.findManyByAnswerId( answerId );
        const answerAttachmentList = new AnswerAttachmentList( currentAnswerAttachments );
        const answerAttachments = [];

        for ( let attachmendId of attachmentsIds )
        {
            answerAttachments.push(
                AnswerAttachment.create(
                    {
                        attachmentId: new UniqueEntityId( attachmendId ),
                        answerId: new UniqueEntityId( answerId )
                    }
                    )
                );
        }

        answerAttachmentList.update( answerAttachments );

        answer.content = content;
        answer.attachments = answerAttachmentList;

        await this.answerRepository.save( answer );

        return right(
            {
                answer
            }
            );
    }
}