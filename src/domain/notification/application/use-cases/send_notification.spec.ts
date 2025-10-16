// -- IMPORTS

import { SendNotificationUseCase } from './send_notification';
import { InMemoryNotificationsRepository } from 'test/repositories/in_memory_notifications_repository';

// -- VARIABLES

let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let sut: SendNotificationUseCase;

// -- STATEMENTS

describe(
    'Send Notification',
    () =>
    {
        beforeEach(
            () =>
            {
                inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
                sut = new SendNotificationUseCase( inMemoryNotificationsRepository );
            }
            );

        it(
            'Should be able to send a notification',
            async () =>
            {
                const result = await sut.execute(
                    {
                        recipientId: '1',
                        title: 'Nova notificação',
                        content: 'Conteúdo da notificação'
                    }
                    );

                expect( result.isRight() ).toBe( true );
                expect( inMemoryNotificationsRepository.items[ 0 ] ).toEqual( result.value?.notification );
            }
            );
    }
    );
