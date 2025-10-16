// -- IMPORTS

import { UniqueEntityId } from '@core/entities/unique_entity_id';
import { Optional } from '@core/types/optional';
import { Comment, CommentProps } from './comment';

// -- TYPES

export interface AnswerCommentProps extends CommentProps
{
    answerId: UniqueEntityId;
}

export class AnswerComment extends Comment<AnswerCommentProps>
{
    // -- INQUIRIES

    get answerId(
        )
    {
        return this.props.answerId;
    }

    // -- OPERATIONS

    static create(
        props: Optional<AnswerCommentProps, 'createdAt'>,
        id?: UniqueEntityId
        )
    {
        const answerComment = new AnswerComment(
            {
                ...props,
                createdAt: props.createdAt ?? new Date()
            },
            id
            );

        return answerComment;
    }
}