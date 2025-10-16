// -- IMPORTS

import { Entity } from '@core/entities/entity';
import { UniqueEntityId } from '@core/entities/unique_entity_id';

// -- TYPES

export interface QuestionAttachmentProps
{
    questionId: UniqueEntityId;
    attachmentId: UniqueEntityId;
}

export class QuestionAttachment extends Entity<QuestionAttachmentProps>
{
    // -- INQUIRIES


    get questionId(
        )
    {
        return this.props.questionId;
    }

    // ~~

    get attachmentId(
        )
    {
        return this.props.attachmentId;
    }

    // -- OPERATIONS

    static create(
        props: QuestionAttachmentProps,
        id?: UniqueEntityId
        )
    {
        const questionattachment = new QuestionAttachment(
            props,
            id
            );

        return questionattachment;
    }
}