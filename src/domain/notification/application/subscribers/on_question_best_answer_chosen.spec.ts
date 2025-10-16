// -- IMPORTS

import { OnQuestionBestAnswerChosen } from './on_question_best_answer_chosen';
import { InMemoryAnswersRepository } from 'test/repositories/in_memory_answers_repository';
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in_memory_answer_attachments_repository';
import { InMemoryQuestionsRepository } from 'test/repositories/in_memory_questions_repository';
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in_memory_question_attachments_repository';
import { InMemoryNotificationsRepository } from 'test/repositories/in_memory_notifications_repository';
import { SendNotificationUseCase, SendNotificationUseCaseRequest, SendNotificationUseCaseResponse } from '../use-cases/send_notification';
import { makeQuestion } from 'test/factories/make_question';
import { makeAnswer } from 'test/factories/make_answer';
import { waitFor } from 'test/utils/wait_for';
import { type MockInstance } from 'vitest';

// -- VARIABLES

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryAnswerAttachmentRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let sut: SendNotificationUseCase;
let sendNotificationExecuteSpy: MockInstance<( request: SendNotificationUseCaseRequest ) => Promise<SendNotificationUseCaseResponse>>;

// -- STATEMENTS

describe(
    'On Question Best Answer Chosen',
    () =>
    {
        beforeEach(
            () =>
            {
                inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository();
                inMemoryQuestionsRepository = new InMemoryQuestionsRepository( inMemoryQuestionAttachmentsRepository );
                inMemoryAnswerAttachmentRepository = new InMemoryAnswerAttachmentsRepository();
                inMemoryAnswersRepository = new InMemoryAnswersRepository( inMemoryAnswerAttachmentRepository );
                inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
                sut = new SendNotificationUseCase( inMemoryNotificationsRepository );

                sendNotificationExecuteSpy = vi.spyOn( sut, 'execute' );

                new OnQuestionBestAnswerChosen(
                    inMemoryAnswersRepository,
                    sut
                    );
            }
            );

        it(
            'Should send a notification when an best answer is chosen',
            async () =>
            {
                const question = makeQuestion();
                const answer = makeAnswer(
                    {
                        questionId: question.id
                    }
                    );

                await inMemoryQuestionsRepository.create( question );
                await inMemoryAnswersRepository.create( answer );

                question.bestAnswerId = answer.id;

                await inMemoryQuestionsRepository.save( question );

                await waitFor(
                    () =>
                    {
                        expect( sendNotificationExecuteSpy ).toHaveBeenCalled();
                    }
                    );
            }
            );
    }
    );
