// -- IMPORTS

import { PaginationParams } from '@core/repositories/pagination_params';
import { Answer } from '@domain/forum/enterprise/entities/answer';

// -- TYPES

export interface AnswersRepository
{
    findById( id: string ): Promise<Answer | null>;
    findManyByQuestionId( questionId: string, params: PaginationParams ): Promise<Answer[]>;
    save( answer: Answer ): Promise<void>;
    create( answer: Answer ): Promise<void>;
    delete( answer: Answer ): Promise<void>;
}