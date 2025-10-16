// -- IMPORTS

import { AggregateRoot } from '../entities/aggregate_root';
import { UniqueEntityId } from '../entities/unique_entity_id';
import { DomainEvent } from './domain_event';

// -- TYPES

type DomainEventCallback = ( event: any ) => void

export class DomainEvents
{
    // -- ATTRIBUTES

    private static handlersMap: Record<string, DomainEventCallback[]> = {};
    private static markedAggregates: AggregateRoot<any>[] = [];

    // -- INQUIRIES

    private static findMarkedAggregateByID(
        id: UniqueEntityId,
        ): AggregateRoot<any> | undefined
    {
        return this.markedAggregates.find( ( aggregate ) => aggregate.id.equals( id ) );
    }

    // -- OPERATIONS

    public static markAggregateForDispatch(
        aggregate: AggregateRoot<any>
        )
    {
        const aggregateFound = !!this.findMarkedAggregateByID( aggregate.id );

        if ( !aggregateFound )
        {
            this.markedAggregates.push( aggregate );
        }
    }

    // ~~

    private static dispatchAggregateEvents(
        aggregate: AggregateRoot<any>
        )
    {
        for ( const event of aggregate.domainEvents )
        {
            this.dispatch( event );
        }
    }

    // ~~

    private static removeAggregateFromMarkedDispatchList(
        aggregate: AggregateRoot<any>
        )
    {
        const aggregateIndex = this.markedAggregates.findIndex( ( aggregate_ ) => aggregate_.equals( aggregate ) );

        this.markedAggregates.splice( aggregateIndex, 1 );
    }

    public static dispatchEventsForAggregate(
        id: UniqueEntityId
        )
    {
        const aggregate = this.findMarkedAggregateByID( id );

        if ( aggregate )
        {
            this.dispatchAggregateEvents( aggregate );
            aggregate.clearEvents();
            this.removeAggregateFromMarkedDispatchList( aggregate );
        }
    }

    // ~~

    public static register(
        callback: DomainEventCallback,
        eventClassName: string
        )
    {
        const wasEventRegisteredBefore = eventClassName in this.handlersMap;

        if ( !wasEventRegisteredBefore )
        {
            this.handlersMap[ eventClassName ] = [];
        }

        this.handlersMap[ eventClassName ].push( callback );
    }

    // ~~

    public static clearHandlers(
        )
    {
        this.handlersMap = {};
    }

    // ~~

    public static clearMarkedAggregates(
        )
    {
        this.markedAggregates = [];
    }

    // ~~

    private static dispatch(
        event: DomainEvent
        )
    {
        const eventClassName: string = event.constructor.name;

        const isEventRegistered = eventClassName in this.handlersMap;

        if ( isEventRegistered )
        {
            const handlers = this.handlersMap[ eventClassName ];

            for ( const handler of handlers )
            {
                handler( event );
            }
        }
    }
}