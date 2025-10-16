// -- TYPES

import { WatchedList } from '@core/entities/watched_list';
import { AnswerAttachment } from './answer_attachment';

// -- TYPES

export class AnswerAttachmentList extends WatchedList<AnswerAttachment>
{
    // -- INQUIRIES

    compareItems(
        a: AnswerAttachment,
        b: AnswerAttachment
        ): boolean
    {
        return a.attachmentId.equals( b.attachmentId );
    }
}