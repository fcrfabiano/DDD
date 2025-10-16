// -- IMPORTS

import { Entity } from '@core/entities/entity';
import { UniqueEntityId } from '@core/entities/unique_entity_id';

// -- TYPES

interface AttachmentProps
{
    title: string;
    link: string;
}

export class Attachment extends Entity<AttachmentProps>
{
    // -- INQUIRIES

    get title(
        )
    {
        return this.props.title;
    }

    // ~~ 

    get link(
        )
    {
        return this.props.link;
    }

    // -- OPERATIONS

    static create(
        props: AttachmentProps,
        id?: UniqueEntityId
        )
    {
        const attachment = new Attachment( props, id );

        return attachment;
    }
}