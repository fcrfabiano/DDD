// -- IMPORTS

import { makeAnswer } from 'test/factories/make_answer';
import { OnAnswerCreated } from './on_answer_created';
import { InMemoryAnswersRepository } from 'test/repositories/in_memory_answers_repository';
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in_memory_answer_attachments_repository';


// -- VARIABLES

let inMemoryAnswerAttachmentRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;

// -- STATEMENTS

describe(
    'On Answer Created',
    () =>
    {
        beforeEach(
            () =>
            {
                inMemoryAnswerAttachmentRepository = new InMemoryAnswerAttachmentsRepository();
                inMemoryAnswersRepository = new InMemoryAnswersRepository( inMemoryAnswerAttachmentRepository );
            }
            );

        it(
            'Should send a notification when an answer is created',
            async () =>
            {
                const onAnswerCreated = new OnAnswerCreated();

                const answer = makeAnswer();

                inMemoryAnswersRepository.create( answer );
            }
            );
    }
    );
