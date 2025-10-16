// -- TYPES

import { WatchedList } from '@core/entities/watched_list';
import { QuestionAttachment } from './question_attachment';

// -- TYPES

export class QuestionAttachmentList extends WatchedList<QuestionAttachment>
{
    // -- INQUIRIES

    compareItems(
        a: QuestionAttachment,
        b: QuestionAttachment
        ): boolean
    {
        return a.attachmentId.equals( b.attachmentId );
    }
}