// -- IMPORTS

import { DomainEvent } from '@core/events/domain_event';
import { Entity } from './entity';
import { DomainEvents } from '@core/events/domain_events';

// -- TYPES

export abstract class AggregateRoot<Props> extends Entity<Props>
{
    // -- ATTRIBUTES

    private _domainEvents: DomainEvent[] = [];

    // -- INQUIRIES

    get domainEvents(
        )
    {
        return this._domainEvents;
    }

    // -- OPERATIONS

    protected addDomainEvent(
        domainEvent: DomainEvent
        ): void
    {
        this._domainEvents.push( domainEvent );
        DomainEvents.markAggregateForDispatch( this );
    }

    // ~~

    public clearEvents(
        )
    {
        this._domainEvents = [];
    }
}