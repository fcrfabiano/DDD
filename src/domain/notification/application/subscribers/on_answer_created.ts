// -- IMPORTS

import { DomainEvents } from '@core/events/domain_events';
import { EventHandler } from '@core/events/event_handler';
import { QuestionRepository } from '@domain/forum/application/repositories/question_repository';
import { AnswerCreatedEvent } from '@domain/forum/enterprise/events/answer_created_event';
import { SendNotificationUseCase } from '../use-cases/send_notification';

// -- TYPES

export class OnAnswerCreated implements EventHandler
{
    // -- CONSTRUCTOR

    constructor(
        private questionRepository: QuestionRepository,
        private sendNotification: SendNotificationUseCase
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
        const question = await this.questionRepository.findById( answer.questionId.toString() );

        if ( question )
        {
            const title = 'Nova resposta em '
                + question.title.substring( 0, 40 ).concat( '...' );
            await this.sendNotification.execute(
            {
                recipientId: question.authorId.toString(),
                title,
                content: answer.excerpt
            }
            )
        }
    }
}