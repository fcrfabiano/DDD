// -- IMPORTS

import { DomainEvents } from '@core/events/domain_events';
import { EventHandler } from '@core/events/event_handler';
import { AnswerCreatedEvent } from '@domain/forum/enterprise/events/answer_created_event';

// -- TYPES

export class OnAnswerCreated implements EventHandler
{
    // -- CONSTRUCTOR

    constructor(
        )
    {
        this.setupSubscriptions();
    }

    // -- OPERATIONS

    public setupSubscriptions(
        )
    {
        DomainEvents.register( this.sendNewAnswerNotification.bind( this ), AnswerCreatedEvent.name );
    }

    // ~~

    private async sendNewAnswerNotification(
        {
            answer
        }: AnswerCreatedEvent
        )
    {
        console.log( answer );
    }
}