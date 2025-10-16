// -- IMPORTS

import { PaginationParams } from '@core/repositories/pagination_params';
import { QuestionComment } from '@domain/forum/enterprise/entities/question_comment';

// -- TYPES

export interface QuestionCommentsRepository
{
    findById( questionCommentId: string ): Promise<QuestionComment | null>;
    findManyByQuestionId( questionId: string, params: PaginationParams ): Promise<QuestionComment[]>;
    create( questionComment: QuestionComment ): Promise<void>;
    delete( questionComment: QuestionComment ): Promise<void>;
}