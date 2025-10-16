// -- IMPORTS

import { UniqueEntityId } from '@core/entities/unique_entity_id';
import { AnswerAttachmentRepository } from '@domain/forum/application/repositories/answer_attachment_repository';
import { AnswerAttachment } from '@domain/forum/enterprise/entities/answer_attachment';

// -- TYPES

export class InMemoryAnswerAttachmentsRepository implements AnswerAttachmentRepository
{
    // -- ATTRIBUTES

    public items: AnswerAttachment[] = [];

    // -- INQUIRIES

    async findManyByAnswerId(
        answerId: string
        )
    {
        const answers = this.items.filter(
            item => item.answerId.toString() === answerId
            );

        return answers;
    }

    // -- OPERATIONS

    async deleteManyByAnswerId(
        answerId: string
        )
    {
        const answersAttachments = this.items.filter(
            item => item.answerId.toString() !== answerId
            );

        this.items = answersAttachments;
    }
}