// -- IMPORTS

import { Notification } from '@domain/notification/enterprise/entities/notification';
import { Either, left, right } from '@core/either';
import { NotificationRepository } from '../repositories/notification_repository';
import { ResourceNotFoundError } from '@core/errors/resource_not_found_error';
import { NotAllowedError } from '@core/errors/not_allowed_error';

// -- TYPES

interface ReadNotificationUseCaseRequest
{
    recipientId: string;
    notificationId: string;
}

type ReadNotificationUseCaseResponse = Either<NotAllowedError | ResourceNotFoundError, { notification: Notification; }>;

export class ReadNotificationUseCase
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
            notificationId
        }: ReadNotificationUseCaseRequest
        ): Promise<ReadNotificationUseCaseResponse>
    {
        const notification = await this.notificationRepository.findById( notificationId );

        if ( !notification )
        {
            return left( new ResourceNotFoundError() );
        }

        if ( notification?.recipientId.toString() !== recipientId )
        {
            return left( new NotAllowedError() );
        }

        notification.read();
        await this.notificationRepository.save( notification );

        return right(
            {
                notification
            }
            );
    }
}