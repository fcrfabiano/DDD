// -- IMPORTS

import { InMemoryAnswersRepository } from 'test/repositories/in_memory_answers_repository';
import { AnswerQuestionUseCase } from './answer_question';
import { AnswersRepository } from '@domain/forum/application/repositories/answers_repository';
import { UniqueEntityId } from '@core/entities/unique_entity_id';
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in_memory_answer_attachments_repository';

// -- VARIABLES

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: AnswerQuestionUseCase;

// -- STATEMENTS

describe(
    'Create an answer',
    () =>
    {
        beforeEach(
            () =>
            {
                inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository();
                inMemoryAnswersRepository = new InMemoryAnswersRepository( inMemoryAnswerAttachmentsRepository );
                sut = new AnswerQuestionUseCase( inMemoryAnswersRepository );
            }
            );

        it(
            'Should be able to answer a question',
            async () =>
            {
                const result = await sut.execute(
                    {
                        instructorId: '1',
                        questionId: '1',
                        content: 'Nova Resposta',
                        attachmentsIds: [ '1', '2' ]
                    }
                    );
        
                expect( result.isRight() ).toBe( true );
                expect( inMemoryAnswersRepository.items[ 0 ] ).toEqual( result.value?.answer );
                expect( inMemoryAnswersRepository.items[ 0 ].attachments.currentItems ).toHaveLength( 2 );
                expect( inMemoryAnswersRepository.items[ 0 ].attachments.currentItems ).toEqual(
                    [
                        expect.objectContaining( { attachmentId: new UniqueEntityId( '1' ) } ),
                        expect.objectContaining( { attachmentId: new UniqueEntityId( '2' ) } )
                    ]
                    );
            }
            );
    }
    );