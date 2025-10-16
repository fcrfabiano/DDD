// -- IMPORTS

import { Notification } from '@domain/notification/enterprise/entities/notification';

// -- TYPES

export interface NotificationRepository
{
    findById( id: string ): Promise<Notification | null>;
    save( notification: Notification ): Promise<void>;
    create( notification: Notification ): Promise<void>;
}