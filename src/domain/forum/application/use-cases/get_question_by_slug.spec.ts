// -- IMPORTS

import { GetQuestionBySlugUseCase } from './get_question_by_slug';
import { InMemoryQuestionsRepository } from 'test/repositories/in_memory_questions_repository';
import { makeQuestion } from 'test/factories/make_question';
import { Slug } from '@domain/forum/enterprise/entities/value-objects/slug';
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in_memory_question_attachments_repository';

// -- VARIABLES

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: GetQuestionBySlugUseCase;

// -- STATEMENTS

describe(
    'Get Question By Slug',
    () =>
    {
        beforeEach(
            () =>
            {
                inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository();
                inMemoryQuestionsRepository = new InMemoryQuestionsRepository( inMemoryQuestionAttachmentsRepository );
                sut = new GetQuestionBySlugUseCase( inMemoryQuestionsRepository );
            }
            );

        it(
            'Should be able to get a question by slug',
            async () =>
            {
                const newQuestion = makeQuestion(
                    {
                        slug: Slug.create( 'example-question' )
                    }
                    );
                await inMemoryQuestionsRepository.create( newQuestion );

                const result = await sut.execute(
                    {
                        slug: 'example-question'
                    }
                    );

                expect( result.value ).toMatchObject(
                    {
                        question: expect.objectContaining(
                            {
                                title: newQuestion.title
                            }
                            )
                    }
                    );
            }
            );
    }
    );
