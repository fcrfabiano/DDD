// -- IMPORTS

import { DomainEvents } from '@core/events/domain_events';
import { getPaginationIndexByPage } from '@core/repositories/get_pagination_index';
import { PaginationParams } from '@core/repositories/pagination_params';
import { AnswerAttachmentRepository } from '@domain/forum/application/repositories/answer_attachment_repository';
import { AnswersRepository } from '@domain/forum/application/repositories/answers_repository';
import { Answer } from '@domain/forum/enterprise/entities/answer';

// -- TYPES

export class InMemoryAnswersRepository implements AnswersRepository
{
    // -- ATTRIBUTES

    public items: Answer[] = [];

    // -- CONSTRUCTOR

    constructor(
        private answerAttachmentRepository: AnswerAttachmentRepository
        )
    {
    }

    // -- INQUIRIES

    async findById(
        id: string
        )
    {
        const answer = this.items.find( answer => answer.id.toString() === id );

        if ( !answer )
        {
            return null;
        }

        return answer;
    }

    // ~~

    async findManyByQuestionId(
        questionId: string,
        {
            page
        }: PaginationParams
        )
    {
        const answers = this.items.filter( ( answer ) => answer.questionId.toString() === questionId );

        const { startIndex, endIndex } = getPaginationIndexByPage( { page } );

        return answers.slice( startIndex, endIndex );
    }

    // -- OPERATIONS

    async save(
        answer: Answer
        )
    {
        const answerIndex = this.items.findIndex( ( answer_ ) => answer_.id === answer.id );

        this.items[ answerIndex ] = answer;

        await this.answerAttachmentRepository.deleteManyByAnswerId( answer.id.toString() );

        DomainEvents.dispatchEventsForAggregate( answer.id );
    }

    // ~~

    async create(
        answer: Answer
        )
    {
        this.items.push( answer );

        DomainEvents.dispatchEventsForAggregate( answer.id );
    }

    // ~~

    async delete(
        answer: Answer
        )
    {
        const answerIndex = this.items.findIndex( ( answer_ ) => answer_.id === answer.id );

        this.items.splice( answerIndex, 1 );
        this.answerAttachmentRepository.deleteManyByAnswerId( answer.id.toString() );
    }
}