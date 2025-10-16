// -- IMPORTS

import { AnswerAttachment } from '@domain/forum/enterprise/entities/answer_attachment';

// -- TYPES

export interface AnswerAttachmentRepository
{
    findManyByAnswerId( answerId: string ): Promise<AnswerAttachment[]>;
    deleteManyByAnswerId( answerId: string ): Promise<void>;
}