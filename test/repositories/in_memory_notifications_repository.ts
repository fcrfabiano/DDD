// -- IMPORTS

import { UniqueEntityId } from '@core/entities/unique_entity_id';
import { NotificationRepository } from '@domain/notification/application/repositories/notification_repository';
import { Notification } from '@domain/notification/enterprise/entities/notification';

// -- TYPES

export class InMemoryNotificationsRepository implements NotificationRepository
{
    // -- ATTRIBUTES

    public items: Notification[] = [];

    // -- CONSTRUCTORS

    constructor(
        )
    {
    }

    // -- INQUIRIES

    async findById(
        notificationId: string
        )
    {
        
        const notification = this.items.find( ( notification_ ) => notification_.id.toString() === notificationId );

        if ( !notification )
        {
            return null;
        }

        return notification;
    }

    // -- OPERATIONS

    async create(
        notification: Notification
        )
    {
        this.items.push( notification );
    }

    // ~~

    async save(
        notification: Notification
        )
    {
        const notificationIndex = this.items.findIndex( ( notification_ ) => notification_.id === notification.id );

        this.items[ notificationIndex ] = notification; 
    }
}