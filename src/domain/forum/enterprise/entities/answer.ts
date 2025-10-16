// -- IMPORTS

import { UniqueEntityId } from '@core/entities/unique_entity_id';
import { Optional } from '@core/types/optional';
import { AnswerAttachmentList } from './answer_attachment_list';
import { AggregateRoot } from '@core/entities/aggregate_root';
import { AnswerCreatedEvent } from '../events/answer_created_event';

// -- TYPES

export interface AnswerProps
{
    authorId: UniqueEntityId;
    questionId: UniqueEntityId;
    content: string;
    attachments: AnswerAttachmentList;
    createdAt: Date;
    updatedAt?: Date;
}

export class Answer extends AggregateRoot<AnswerProps>
{
    // -- INQUIRIES

    get authorId(
        )
    {
        return this.props.authorId;
    }

    // ~~

    get content(
        )
    {
        return this.props.content;
    }

    // ~~

    get questionId(
        )
    {
        return this.props.questionId;
    }

    // ~~

    get attachments(
        )
    {
        return this.props.attachments;
    }

    // ~~

    get createdAt(
        )
    {
        return this.props.createdAt;
    }

    // ~~

    get updatedAt(
        )
    {
        return this.props.updatedAt;
    }

    // ~~

    get excerpt(
        )
    {
        return this.content
            .slice( 0, 120 )
            .trimEnd()
            .concat( '...' );
    }

    // -- OPERATIONS

    static create(
        props: Optional<AnswerProps, 'createdAt' | 'attachments'>,
        id?: UniqueEntityId
        )
    {
        const answer = new Answer(
            {
                ...props,
                attachments: props.attachments ?? new AnswerAttachmentList(),
                createdAt: props.createdAt ?? new Date()
            },
            id
            );

        const isNewAnswer = !id;

        if ( isNewAnswer )
        {
            answer.addDomainEvent( new AnswerCreatedEvent( answer ) );
        }

        return answer;
    }

    // ~~

    set content(
        content: string
        )
    {
        this.props.content = content;
        this.touch();
    }

    // ~~

    set attachments(
        attachments: AnswerAttachmentList
        )
    {
        this.props.attachments = attachments;
        this.touch();
    }

    // ~~

    private touch(
        )
    {
        this.props.updatedAt = new Date();
    }
}