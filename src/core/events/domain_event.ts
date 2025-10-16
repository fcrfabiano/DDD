// -- IMPORTS

import { UniqueEntityId } from '../entities/unique_entity_id';

// -- TYPES

export interface DomainEvent
{
    ocurredAt: Date;
    getAggregateId(): UniqueEntityId;
}