// -- IMPORTS

import { UniqueEntityId } from '@core/entities/unique_entity_id';
import { DomainEvents } from '@core/events/domain_events';
import { getPaginationIndexByPage } from '@core/repositories/get_pagination_index';
import { PaginationParams } from '@core/repositories/pagination_params';
import { QuestionAttachmentRepository } from '@domain/forum/application/repositories/question_attachment_repository';
import { QuestionRepository } from '@domain/forum/application/repositories/question_repository';
import { Question } from '@domain/forum/enterprise/entities/question';

// -- TYPES

export class InMemoryQuestionsRepository implements QuestionRepository
{
    // -- ATTRIBUTES

    public items: Question[] = [];

    // -- CONSTRUCTORS

    constructor(
        private questionAttachmentsRepository: QuestionAttachmentRepository
        )
    {
    }

    // -- INQUIRIES

    async findById(
        id: string
        )
    {
        const question = this.items.find( ( question_ ) => question_.id.toString() === id );

        if ( !question )
        {
            return null;
        }

        return question;
    }

    // ~~

    async findBySlug(
        slug: string
        )
    {
        const question = this.items.find( ( question_ ) => question_.slug.value === slug );

        if ( !question )
        {
            return null;
        }

        return question;
    }

    // ~~

    async findManyRecent(
        {
            page
        }: PaginationParams
        )
    {
        const questions = this.items.sort( ( a, b ) => b.createdAt.getTime() - a.createdAt.getTime() );

        const { startIndex, endIndex } = getPaginationIndexByPage( { page } );

        return questions.slice( startIndex, endIndex );
    }
    // -- OPERATIONS

    async save(
        question: Question
        )
    {
        const questionIndex = this.items.findIndex( ( question_ ) => question_.id === question.id );

        this.items[ questionIndex ] = question;

        DomainEvents.dispatchEventsForAggregate( question.id );
    }

    // ~~

    async create(
        question: Question
        )
    {
        this.items.push( question );

        DomainEvents.dispatchEventsForAggregate( question.id );
    }

    // ~~

    async delete(
        question: Question
        )
    {
        const questionIndex = this.items.findIndex( ( question_ ) => question_.id === question.id );

        this.items.splice( questionIndex, 1 );

        await this.questionAttachmentsRepository.deleteManyByQuestionId( question.id.toString() );
    }
}