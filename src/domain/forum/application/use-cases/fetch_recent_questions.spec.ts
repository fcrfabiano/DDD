// -- IMPORTS

import { FetchRecentQuestionsUseCase } from './fetch_recent_questions';
import { InMemoryQuestionsRepository } from 'test/repositories/in_memory_questions_repository';
import { makeQuestion } from 'test/factories/make_question';
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in_memory_question_attachments_repository';

// -- VARIABLES

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: FetchRecentQuestionsUseCase;

// -- STATEMENTS

describe(
    'Fetch Recent Questions',
    () =>
    {
        beforeEach(
            () =>
            {
                inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository();
                inMemoryQuestionsRepository = new InMemoryQuestionsRepository( inMemoryQuestionAttachmentsRepository );
                sut = new FetchRecentQuestionsUseCase( inMemoryQuestionsRepository );
            }
            );

        it(
            'Should be able to fetch recent questions',
            async () =>
            {
                await inMemoryQuestionsRepository.create(
                    makeQuestion( { createdAt: new Date( 2022, 0, 20 ) } )
                    );
                await inMemoryQuestionsRepository.create(
                    makeQuestion( { createdAt: new Date( 2022, 0, 18 ) } )
                    );
                await inMemoryQuestionsRepository.create(
                    makeQuestion( { createdAt: new Date( 2022, 0, 23 ) } )
                    );

                const result = await sut.execute(
                    {
                        page: 1
                    }
                    );

                expect( result.value?.questions ).toEqual(
                    [
                        expect.objectContaining(
                            {
                                createdAt: new Date( 2022, 0, 23 )
                            }
                            ),
                        expect.objectContaining(
                            {
                                createdAt: new Date( 2022, 0, 20 )
                            }
                            ),
                        expect.objectContaining(
                            {
                                createdAt: new Date( 2022, 0, 18 )
                            }
                            )
                    ]
                    );
            }
            );

        it(
            'Should be able to fetch paginated recent questions',
            async () =>
            {
                for ( let index = 1; index <= 22; index++ )
                {
                    await inMemoryQuestionsRepository.create( makeQuestion() );
                }

                const result = await sut.execute(
                    {
                        page: 2
                    }
                    );

                expect( result.value?.questions ).toHaveLength( 2 );
            }
            );
    }
    );
