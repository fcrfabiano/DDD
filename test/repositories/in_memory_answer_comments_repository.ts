// -- IMPORTS

import { UniqueEntityId } from '@core/entities/unique_entity_id';
import { getPaginationIndexByPage } from '@core/repositories/get_pagination_index';
import { PaginationParams } from '@core/repositories/pagination_params';
import { AnswerCommentsRepository } from '@domain/forum/application/repositories/answer_comments_repository';
import { AnswerComment } from '@domain/forum/enterprise/entities/answer_comment';

// -- TYPES

export class InMemoryAnswerCommentsRepository implements AnswerCommentsRepository
{
    // -- ATTRIBUTES

    public items: AnswerComment[] = [];

    // -- INQUIRIES

    async findById(
        answerCommentId: string
        )
    {
        const answerComment = this.items.find( ( answerComment_ ) => answerComment_.id.toString() === answerCommentId );

        if ( !answerComment )
        {
            return null;
        }

        return answerComment;
    }

    // ~~

    async findManyByAnswerId(
        answerId: string,
        {
            page
        }: PaginationParams
        )
    {
        const answerComments = this.items.filter( ( answer ) => answer.answerId.toString() === answerId );

        const { startIndex, endIndex } = getPaginationIndexByPage( { page } );

        return answerComments.slice( startIndex, endIndex );
    }

    // -- OPERATIONS

    async create(
        answerComment: AnswerComment
        )
    {
        this.items.push( answerComment );
    }

    // ~~

    async delete(
        answerComment: AnswerComment
        )
    {
        const answerCommentIndex = this.items.findIndex( ( answerComment_ ) => answerComment_.id === answerComment.id );
        
        this.items.splice( answerCommentIndex, 1 );
    }
}