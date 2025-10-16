// -- IMPORTS

import { UniqueEntityId } from '@core/entities/unique_entity_id';
import { QuestionAttachment, QuestionAttachmentProps } from '@domain/forum/enterprise/entities/question_attachment';

// -- FUNCTIONS

export function makeQuestionAttachment(
    override: Partial<QuestionAttachmentProps> = {},
    id?: UniqueEntityId
    )
{
    const question = QuestionAttachment.create(
        {
            attachmentId: new UniqueEntityId(),
            questionId: new UniqueEntityId(),
            ...override
        },
        id
        );

    return question;
}