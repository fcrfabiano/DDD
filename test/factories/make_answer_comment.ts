// -- IMPORTS

import { UniqueEntityId } from '@core/entities/unique_entity_id';
import { AnswerComment, AnswerCommentProps } from '@domain/forum/enterprise/entities/answer_comment';
import { faker } from '@faker-js/faker';

// -- FUNCTIONS

export function makeAnswerComment(
    override: Partial<AnswerCommentProps> = {},
    id?: UniqueEntityId
    )
{
    const answerComment = AnswerComment.create(
        {
            authorId: new UniqueEntityId(),
            answerId: new UniqueEntityId(),
            content: faker.lorem.text(),
            ...override
        },
        id
        );

    return answerComment;
}