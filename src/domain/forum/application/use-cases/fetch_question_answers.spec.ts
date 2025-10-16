// -- IMPORTS

import { FetchQuestionAnswersUseCase } from './fetch_question_answers';
import { InMemoryAnswersRepository } from 'test/repositories/in_memory_answers_repository';
import { makeQuestion } from 'test/factories/make_question';
import { makeAnswer } from 'test/factories/make_answer';
import { UniqueEntityId } from '@core/entities/unique_entity_id';
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in_memory_answer_attachments_repository';

// -- VARIABLES

let inMemoryAnswersAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: FetchQuestionAnswersUseCase;

// -- STATEMENTS

describe(
    'Fetch Question Answers',
    () =>
    {
        beforeEach(
            () =>
            {
                inMemoryAnswersAttachmentsRepository = new InMemoryAnswerAttachmentsRepository();
                inMemoryAnswersRepository = new InMemoryAnswersRepository( inMemoryAnswersAttachmentsRepository );
                sut = new FetchQuestionAnswersUseCase( inMemoryAnswersRepository );
            }
            );

        it(
            'Should be able to fetch answers by question id',
            async () =>
            {
                await inMemoryAnswersRepository.create( makeAnswer( { questionId: new UniqueEntityId( 'question-1' ) } ) );
                await inMemoryAnswersRepository.create( makeAnswer( { questionId: new UniqueEntityId( 'question-1' ) } ) );
                await inMemoryAnswersRepository.create( makeAnswer( { questionId: new UniqueEntityId( 'question-1' ) } ) );

                const result = await sut.execute(
                    {
                        questionId: 'question-1',
                        page: 1
                    }
                    );

                expect( result.isRight() ).toBe( true );
                expect( result.value?.answers ).toHaveLength( 3 );
            }
            );

        it(
            'Should be able to fetch paginated question answers',
            async () =>
            {
                for ( let index = 1; index <= 22; index++ )
                {
                    await inMemoryAnswersRepository.create( makeAnswer( { questionId: new UniqueEntityId( 'question-1' ) } ) );
                }

                const result = await sut.execute(
                    {
                        questionId: 'question-1',
                        page: 2
                    }
                    );

                expect( result.isRight() ).toBe( true );
                expect( result.value?.answers ).toHaveLength( 2 );
            }
            );
    }
    );
