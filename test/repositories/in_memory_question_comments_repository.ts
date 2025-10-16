// -- IMPORTS

import { UniqueEntityId } from '@core/entities/unique_entity_id';
import { getPaginationIndexByPage } from '@core/repositories/get_pagination_index';
import { PaginationParams } from '@core/repositories/pagination_params';
import { QuestionCommentsRepository } from '@domain/forum/application/repositories/question_comments_repository';
import { QuestionComment } from '@domain/forum/enterprise/entities/question_comment';

// -- TYPES

export class InMemoryQuestionCommentsRepository implements QuestionCommentsRepository
{
    // -- ATTRIBUTES

    public items: QuestionComment[] = [];

    // -- INQUIRIES

    async findById(
        questionCommentId: string
        )
    {
        const questionComment = this.items.find( questionComment_ => questionComment_.id.toString() === questionCommentId );

        if ( !questionComment )
        {
            return null;
        }

        return questionComment;
    }

    // ~~

    async findManyByQuestionId(
        questionId: string,
        {
            page
        }: PaginationParams
        )
    {
        const questionComments = this.items.filter( ( questionComment ) => questionComment.questionId.toString() === questionId );

        const { startIndex, endIndex } = getPaginationIndexByPage( { page } );

        return questionComments.slice( startIndex, endIndex );
    }

    // -- OPERATIONS

    async create(
        questionComment: QuestionComment
        )
    {
        this.items.push( questionComment );
    }

    // ~~

    async delete(
        questionComment: QuestionComment
        )
    {
        const questionCommentIndex = this.items.findIndex( ( questionComment ) => questionComment.id === questionComment.id );

        this.items.splice( questionCommentIndex, 1 );
    }
}