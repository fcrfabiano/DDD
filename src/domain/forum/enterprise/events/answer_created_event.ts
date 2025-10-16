// -- IMPORTS

import { DomainEvent } from '@core/events/domain_event';
import { Answer } from '../entities/answer';
import { UniqueEntityId } from '@core/entities/unique_entity_id';

// -- TYPES

export class AnswerCreatedEvent implements DomainEvent
{
    // -- ATTRIBUTES

    public ocurredAt: Date;
    public answer: Answer; 

    // -- CONSTRUCTOR

    constructor(
        answer: Answer
        )
    {
        this.answer = answer;
        this.ocurredAt = new Date();
    }

    // -- INQUIRIES

    public getAggregateId(
        )
    {
        return this.answer.id;        
    }
}