// -- IMPORTS

import { DomainEvents } from '@core/events/domain_events';
import { EventHandler } from '@core/events/event_handler';
import { AnswersRepository } from '@domain/forum/application/repositories/answers_repository';
import { QuestionBestAnswerChosenEvent } from '@domain/forum/enterprise/events/question_best_answer_chosen_event';
import { SendNotificationUseCase } from '../use-cases/send_notification';

// -- TYPES

export class OnQuestionBestAnswerChosen implements EventHandler
{
    // -- CONSTRUCTOR

    constructor(
        private answersRepository: AnswersRepository,
        private sendNotification: SendNotificationUseCase
        )
    {
        this.setupSubscriptions();
    }

    // -- OPERATIONS

    public setupSubscriptions(
        )
    {
        DomainEvents.register( this.sendQuestionBestAnswerNotification.bind( this ), QuestionBestAnswerChosenEvent.name );
    }

    // ~~

    private async sendQuestionBestAnswerNotification(
        {
            question,
            bestAnswerId
        }: QuestionBestAnswerChosenEvent
        )
    {
        const answer = await this.answersRepository.findById( bestAnswerId.toString() );

        if ( answer )
        {
            const content = 'A resposta que você enviou em '
                + question.title.slice( 0, 20 )
                + ' foi escolhida pelo autor!';

            await this.sendNotification.execute(
                {
                    recipientId: question.authorId.toString(),
                    title: 'Sua resposta foi escolhida!',
                    content
                }
                );
        }
    }
}