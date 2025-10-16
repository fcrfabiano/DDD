// -- IMPORTS

import { PaginationParams } from '@core/repositories/pagination_params';
import { AnswerComment } from '@domain/forum/enterprise/entities/answer_comment';

// -- TYPES

export interface AnswerCommentsRepository
{
    findById( answerCommentId: string ): Promise<AnswerComment | null>;
    findManyByAnswerId( answerId: string, params: PaginationParams ): Promise<AnswerComment[]>;
    create( answerComment: AnswerComment ): Promise<void>;
    delete( answerComment: AnswerComment ): Promise<void>;
}