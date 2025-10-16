// -- IMPORTS

import { UniqueEntityId } from '@core/entities/unique_entity_id';
import { EditAnswerUseCase } from './edit_answer';
import { AnswersRepository } from '@domain/forum/application/repositories/answers_repository';
import { Answer } from '@domain/forum/enterprise/entities/answer';
import { makeAnswer } from 'test/factories/make_answer';
import { InMemoryAnswersRepository } from 'test/repositories/in_memory_answers_repository';
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in_memory_answer_attachments_repository';
import { NotAllowedError } from '../../../../core/errors/not_allowed_error';
import { makeAnswerAttachment } from 'test/factories/make_answer_attachment';

// -- VARIABLES

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: EditAnswerUseCase;

// -- STATEMENTS

describe(
    'Edit Answer',
    () =>
    {
        beforeEach(
            () =>
            {
                inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository();
                inMemoryAnswersRepository = new InMemoryAnswersRepository( inMemoryAnswerAttachmentsRepository );
                sut = new EditAnswerUseCase( inMemoryAnswersRepository, inMemoryAnswerAttachmentsRepository );
            }
            );

        it(
            'Should be able to edit a answer',
            async () =>
            {
                const newAnswer = makeAnswer(
                    {
                        authorId: new UniqueEntityId( 'author-1' )
                    },
                    new UniqueEntityId( 'answer-1' )
                    );

                await inMemoryAnswersRepository.create( newAnswer );

                inMemoryAnswerAttachmentsRepository.items.push(
                        makeAnswerAttachment(
                            {
                                answerId: newAnswer.id,
                                attachmentId: new UniqueEntityId( '1' )
                            }
                            ),
                        makeAnswerAttachment(
                            {
                                answerId: newAnswer.id,
                                attachmentId: new UniqueEntityId( '2' )
                            }
                            )
                    );

                await sut.execute(
                    {
                        authorId: 'author-1',
                        answerId: newAnswer.id.toString(),
                        content: 'New content',
                        attachmentsIds: [ '1', '3' ]
                    }
                    );

                expect( inMemoryAnswersRepository.items[ 0 ].attachments.currentItems ).toHaveLength( 2 );
                expect( inMemoryAnswersRepository.items[ 0 ] ).toMatchObject(
                    {
                        content: 'New content'
                    }
                    );
                expect( inMemoryAnswersRepository.items[ 0 ].attachments.currentItems ).toEqual(
                    [
                        expect.objectContaining( { attachmentId: new UniqueEntityId( '1' ) } ),
                        expect.objectContaining( { attachmentId: new UniqueEntityId( '3' ) } )
                    ]
                    );
            }
            );

        it(
            'Should not be able to edit a answer from another user',
            async () =>
            {
                const newAnswer = makeAnswer(
                    {
                        authorId: new UniqueEntityId( 'author-1' )
                    },
                    new UniqueEntityId( 'answer-1' )
                    );

                await inMemoryAnswersRepository.create( newAnswer );
        
                const result = await sut.execute(
                    {
                        authorId: 'author-2',
                        answerId: newAnswer.id.toValue(),
                        content: 'New content',
                        attachmentsIds: []
                    }
                    );

                expect( result.isLeft() ).toBe( true );
                expect( result.value ).toBeInstanceOf( NotAllowedError );
            }
            );
    }
    );
