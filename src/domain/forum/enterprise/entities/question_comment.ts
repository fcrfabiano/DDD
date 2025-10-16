// -- IMPORTS

import { UniqueEntityId } from '@core/entities/unique_entity_id';
import { Optional } from '@core/types/optional';
import { Comment, CommentProps } from './comment';

// -- TYPES

export interface QuestionCommentProps extends CommentProps
{
    questionId: UniqueEntityId;
}

export class QuestionComment extends Comment<QuestionCommentProps>
{
    // -- INQUIRIES

    get questionId(
        )
    {
        return this.props.questionId;
    }

    // -- OPERATIONS

    static create(
        props: Optional<QuestionCommentProps, 'createdAt'>,
        id?: UniqueEntityId
        )
    {
        const questionComment = new QuestionComment(
            {
                ...props,
                createdAt: props.createdAt ?? new Date()
            },
            id
            );

        return questionComment;
    }
}