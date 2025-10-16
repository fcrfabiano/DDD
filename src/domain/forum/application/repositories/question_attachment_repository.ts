// -- IMPORTS

import { QuestionAttachment } from '@domain/forum/enterprise/entities/question_attachment';

// -- TYPES

export interface QuestionAttachmentRepository
{
    findManyByQuestionId( questionId: string ): Promise<QuestionAttachment[]>;
    deleteManyByQuestionId( questionId: string ): Promise<void>;
}