// -- IMPORTS

import { UniqueEntityId } from '@core/entities/unique_entity_id';
import { CreateQuestionUseCase } from './create_question';
import { QuestionRepository } from '@domain/forum/application/repositories/question_repository';
import { Question } from '@domain/forum/enterprise/entities/question';
import { InMemoryQuestionsRepository } from 'test/repositories/in_memory_questions_repository';
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in_memory_question_attachments_repository';

// -- VARIABLES

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: CreateQuestionUseCase;

// -- STATEMENTS

describe(
    'Create Question',
    () =>
    {
        beforeEach(
            () =>
            {
                inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository();
                inMemoryQuestionsRepository = new InMemoryQuestionsRepository( inMemoryQuestionAttachmentsRepository );
                sut = new CreateQuestionUseCase( inMemoryQuestionsRepository );
            }
            );

        it(
            'Should be able to create a question',
            async () =>
            {
                const result = await sut.execute(
                    {
                        authorId: '1',
                        title: 'Nova pergunta',
                        content: 'Conteúdo da pergunta',
                        attachmentsIds: [ '1', '2' ]
                    }
                    );
        
                expect( result.isRight() ).toBe( true );
                expect( inMemoryQuestionsRepository.items[ 0 ] ).toEqual( result.value?.question );
                expect( inMemoryQuestionsRepository.items[ 0 ].attachments.currentItems ).toHaveLength( 2 );
                expect( inMemoryQuestionsRepository.items[ 0 ].attachments.currentItems ).toEqual(
                    [
                        expect.objectContaining( { attachmentId: new UniqueEntityId( '1' ) } ),
                        expect.objectContaining( { attachmentId: new UniqueEntityId( '2' ) } )
                    ]
                    );
            }
            );
    }
    );
