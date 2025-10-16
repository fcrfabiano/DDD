// -- IMPORTS

import { UniqueEntityId } from '@core/entities/unique_entity_id';
import { QuestionAttachmentRepository } from '@domain/forum/application/repositories/question_attachment_repository';
import { QuestionAttachment } from '@domain/forum/enterprise/entities/question_attachment';

// -- TYPES

export class InMemoryQuestionAttachmentsRepository implements QuestionAttachmentRepository
{
    // -- ATTRIBUTES

    public items: QuestionAttachment[] = [];

    // -- INQUIRIES

    async findManyByQuestionId(
        questionId: string
        )
    {
        const questions = this.items.filter(
            item => item.questionId.toString() === questionId
            );

        return questions;
    }

    // -- OPERATIONS

    async deleteManyByQuestionId(
        questionId: string
        )
    {
        const questionsAttachments = this.items.filter(
            item => item.questionId.toString() !== questionId
            );

        this.items = questionsAttachments;
    }
}