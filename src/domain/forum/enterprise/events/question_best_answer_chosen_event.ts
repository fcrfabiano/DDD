// -- IMPORTS

import { DomainEvent } from '@core/events/domain_event';
import { UniqueEntityId } from '@core/entities/unique_entity_id';
import { Question } from '../entities/question';

// -- TYPES

export class QuestionBestAnswerChosenEvent implements DomainEvent
{
    // -- ATTRIBUTES

    public ocurredAt: Date;
    public question: Question;
    public bestAnswerId: UniqueEntityId;

    // -- CONSTRUCTOR

    constructor(
        question: Question,
        bestAnswerId: UniqueEntityId
        )
    {
        this.question = question;
        this.ocurredAt = new Date();
        this.bestAnswerId = bestAnswerId;
    }

    // -- INQUIRIES

    public getAggregateId(
        )
    {
        return this.question.id;        
    }
}