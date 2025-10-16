// -- IMPORTS

import { UniqueEntityId } from '@core/entities/unique_entity_id';
import { AnswerAttachment, AnswerAttachmentProps } from '@domain/forum/enterprise/entities/answer_attachment';

// -- FUNCTIONS

export function makeAnswerAttachment(
    override: Partial<AnswerAttachmentProps> = {},
    id?: UniqueEntityId
    )
{
    const answer = AnswerAttachment.create(
        {
            attachmentId: new UniqueEntityId(),
            answerId: new UniqueEntityId(),
            ...override
        },
        id
        );

    return answer;
}