// -- IMPORTS

import { UniqueEntityId } from '@core/entities/unique_entity_id';
import { Notification, NotificationProps } from '@domain/notification/enterprise/entities/notification';
import { faker } from '@faker-js/faker';

// -- FUNCTIONS

export function makeNotification(
    override: Partial<NotificationProps> = {},
    id?: UniqueEntityId
    )
{
    const notification = Notification.create(
        {
            recipientId: new UniqueEntityId(),
            title: faker.lorem.sentence(),
            content: faker.lorem.text(),
            ...override
        },
        id
        );

    return notification;
}