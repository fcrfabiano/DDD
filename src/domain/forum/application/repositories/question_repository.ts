// -- IMPORTS

import { PaginationParams } from '@core/repositories/pagination_params';
import { Question } from '@domain/forum/enterprise/entities/question';

// -- TYPES

export interface QuestionRepository
{
    findById( id: string ): Promise<Question | null>;
    findBySlug( slug: string ): Promise<Question | null>;
    findManyRecent( params: PaginationParams ): Promise<Question[]>;
    save( question: Question ): Promise<void>;
    create( question: Question ): Promise<void>;
    delete( question: Question ): Promise<void>;
}