// -- IMPORTS

import { AggregateRoot } from '@core/entities/aggregate_root';
import { DomainEvent } from './domain_event';
import { UniqueEntityId } from '@core/entities/unique_entity_id';
import { DomainEvents } from './domain_events';
import { vi } from 'vitest';

// -- TYPES

class CustomAggregateCreated implements DomainEvent
{
    // -- ATTRIBUTES

    public ocurredAt: Date;
    private aggregate: CustomAggregate;

    // -- CONSTRUCTOR

    constructor(
        aggregate: CustomAggregate
        )
    {
        this.aggregate = aggregate;
        this.ocurredAt = new Date();
    }

    // -- INQUIRIES

    public getAggregateId(
        )
    {
        return this.aggregate.id;
    }
}

// ~~

class CustomAggregate extends AggregateRoot<null>
{
    // -- OPERATIONS

    static create(
        )
    {
        const aggregate = new CustomAggregate( null );

        aggregate.addDomainEvent(
            new CustomAggregateCreated(
                aggregate
                )
            );

        return aggregate;
    }
}

// -- STATEMENTS


describe(
    'Domain Events',
    () =>
    {
        it(
            'Should be able to dispatch and listen to events',
            () =>
            {
                const callbackSpy = vi.fn();

                DomainEvents.register(
                    callbackSpy,
                    CustomAggregateCreated.name
                    );

                const aggregate = CustomAggregate.create();

                expect( aggregate.domainEvents ).toHaveLength( 1 );

                DomainEvents.dispatchEventsForAggregate( aggregate.id );

                expect( callbackSpy ).toHaveBeenCalled();
                expect( aggregate.domainEvents ).toHaveLength( 0 );
            }
            );
    }
    );