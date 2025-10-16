// -- IMPORTS

import { UniqueEntityId } from '@core/entities/unique_entity_id';
import { Notification } from '@domain/notification/enterprise/entities/notification';
import { Either, right } from '@core/either';
import { NotificationRepository } from '../repositories/notification_repository';

// -- TYPES

interface SendNotificationUseCaseRequest
{
    recipientId: string;
    title: string;
    content: string;
}

type SendNotificationUseCaseResponse = Either<null, { notification: Notification; }>;

export class SendNotificationUseCase
{
    // -- CONSTRUCTOR

    constructor(
        private notificationRepository: NotificationRepository
        )
    {
    }

    // -- OPERATIONS

    async execute(
        {
            recipientId,
            title,
            content,
        }: SendNotificationUseCaseRequest
        ): Promise<SendNotificationUseCaseResponse>
    {
        const notification = Notification.create(
            {
                recipientId: new UniqueEntityId( recipientId ),
                title,
                content
            }
            );

        await this.notificationRepository.create( notification );

        return right(
            {
                notification
            }
            );
    }
}