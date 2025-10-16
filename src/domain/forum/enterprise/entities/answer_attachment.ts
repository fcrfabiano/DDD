// -- IMPORTS

import { Entity } from '@core/entities/entity';
import { UniqueEntityId } from '@core/entities/unique_entity_id';

// -- TYPES

export interface AnswerAttachmentProps
{
    answerId: UniqueEntityId;
    attachmentId: UniqueEntityId;
}

export class AnswerAttachment extends Entity<AnswerAttachmentProps>
{
    // -- INQUIRIES

    get answerId(
        )
    {
        return this.props.answerId;
    }

    // ~~

    get attachmentId(
        )
    {
        return this.props.attachmentId;
    }

    // -- OPERATIONS

    static create(
        props: AnswerAttachmentProps,
        id?: UniqueEntityId
        )
    {
        const answerAttachment = new AnswerAttachment(
            props,
            id
            );

        return answerAttachment;
    }
}