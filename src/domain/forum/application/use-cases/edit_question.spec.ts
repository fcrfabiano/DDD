// -- IMPORTS

import { UniqueEntityId } from '@core/entities/unique_entity_id';
import { EditQuestionUseCase } from './edit_question';
import { QuestionRepository } from '@domain/forum/application/repositories/question_repository';
import { Question } from '@domain/forum/enterprise/entities/question';
import { makeQuestion } from 'test/factories/make_question';
import { InMemoryQuestionsRepository } from 'test/repositories/in_memory_questions_repository';
import { NotAllowedError } from '../../../../core/errors/not_allowed_error';
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in_memory_question_attachments_repository';
import { makeQuestionAttachment } from 'test/factories/make_question_attachment';

// -- VARIABLES

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let sut: EditQuestionUseCase;

// -- STATEMENTS

describe(
    'Edit Question',
    () =>
    {
        beforeEach(
            () =>
            {
                inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository();
                inMemoryQuestionsRepository = new InMemoryQuestionsRepository( inMemoryQuestionAttachmentsRepository );
                sut = new EditQuestionUseCase( inMemoryQuestionsRepository, inMemoryQuestionAttachmentsRepository );
            }
            );

        it(
            'Should be able to edit a question',
            async () =>
            {
                const newQuestion = makeQuestion(
                    {
                        authorId: new UniqueEntityId( 'author-1' )
                    },
                    new UniqueEntityId( 'question-1' )
                    );

                await inMemoryQuestionsRepository.create( newQuestion );

                inMemoryQuestionAttachmentsRepository.items.push(
                    makeQuestionAttachment(
                        {
                            questionId: newQuestion.id,
                            attachmentId: new UniqueEntityId( '1' )
                        }
                        ),
                    makeQuestionAttachment(
                        {
                            questionId: newQuestion.id,
                            attachmentId: new UniqueEntityId( '2' )
                        }
                        )
                    );

                await sut.execute(
                    {
                        authorId: 'author-1',
                        questionId: newQuestion.id.toString(),
                        title: 'New title',
                        content: 'New content',
                        attachmentsIds: [ '1', '3' ]
                    }
                    );

                expect( inMemoryQuestionsRepository.items[ 0 ].attachments.currentItems ).toHaveLength( 2 );
                expect( inMemoryQuestionsRepository.items[ 0 ] ).toMatchObject(
                    {
                        title: 'New title',
                        content: 'New content'
                    }
                    );
                expect( inMemoryQuestionsRepository.items[ 0 ].attachments.currentItems ).toEqual(
                    [
                        expect.objectContaining( { attachmentId: new UniqueEntityId( '1' ) } ),
                        expect.objectContaining( { attachmentId: new UniqueEntityId( '3' ) } )
                    ]
                    );
            }
            );

        it(
            'Should not be able to edit a question from another user',
            async () =>
            {
                const newQuestion = makeQuestion(
                    {
                        authorId: new UniqueEntityId( 'author-1' )
                    },
                    new UniqueEntityId( 'question-1' )
                    );

                await inMemoryQuestionsRepository.create( newQuestion );
        
                const result = await sut.execute(
                    {
                        authorId: 'author-2',
                        questionId: newQuestion.id.toString(),
                        title: 'New title',
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
