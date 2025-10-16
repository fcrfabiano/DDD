// -- IMPORTS

import { UniqueEntityId } from '@core/entities/unique_entity_id';
import { Answer, AnswerProps } from '@domain/forum/enterprise/entities/answer';
import { faker } from '@faker-js/faker';

// -- FUNCTIONS

export function makeAnswer(
    override: Partial<AnswerProps> = {},
    id?: UniqueEntityId
    )
{
    const answer = Answer.create(
        {
            authorId: new UniqueEntityId(),
            questionId: new UniqueEntityId(),
            content: faker.lorem.text(),
            ...override
        },
        id
        );

    return answer;
}