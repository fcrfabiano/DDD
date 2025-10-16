// -- IMPORTS

import { UniqueEntityId } from '@core/entities/unique_entity_id';
import { QuestionComment, QuestionCommentProps } from '@domain/forum/enterprise/entities/question_comment';
import { faker } from '@faker-js/faker';

// -- FUNCTIONS

export function makeQuestionComment(
    override: Partial<QuestionCommentProps> = {},
    id?: UniqueEntityId
    )
{
    const questionComment = QuestionComment.create(
        {
            authorId: new UniqueEntityId(),
            questionId: new UniqueEntityId(),
            content: faker.lorem.text(),
            ...override
        },
        id
        );

    return questionComment;
}