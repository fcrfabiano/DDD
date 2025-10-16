// -- IMPORTS

import { makeNotification } from 'test/factories/make_notification';
import { ReadNotificationUseCase } from './read_notification';
import { InMemoryNotificationsRepository } from 'test/repositories/in_memory_notifications_repository';
import { UniqueEntityId } from '@core/entities/unique_entity_id';
import { NotAllowedError } from '@core/errors/not_allowed_error';

// -- VARIABLES

let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let sut: ReadNotificationUseCase;

// -- STATEMENTS

describe(
    'Send Notification',
    () =>
    {
        beforeEach(
            () =>
            {
                inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
                sut = new ReadNotificationUseCase( inMemoryNotificationsRepository );
            }
            );

        it(
            'Should be able to read a notification',
            async () =>
            {
                const newNotification = makeNotification();

                await inMemoryNotificationsRepository.create( newNotification );

                const result = await sut.execute(
                    {
                        recipientId: newNotification.recipientId.toString(),
                        notificationId: newNotification.id.toString()
                    }
                    );

                expect( result.isRight() ).toBe( true );
                expect( inMemoryNotificationsRepository.items[ 0 ].readAt ).toEqual( 
                    expect.any( Date )
                    );
            }
            );

        it(
            'Should not be able to read a notification from another user',
            async () =>
            {
                const newNotification = makeNotification(
                    {
                        recipientId: new UniqueEntityId( 'recipient-1' )
                    },
                    new UniqueEntityId( 'notification-1' )
                    );

                await inMemoryNotificationsRepository.create( newNotification );

                const result = await sut.execute(
                    {
                        notificationId: 'notification-1',
                        recipientId: 'recipient-2'
                    }
                    );

                expect( result.isLeft() ).toBe( true );
                expect( result.value ).toBeInstanceOf( NotAllowedError );
    
            }
            );
    }
    );
