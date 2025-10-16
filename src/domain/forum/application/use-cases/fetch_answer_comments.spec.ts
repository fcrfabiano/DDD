// -- IMPORTS

import { FetchAnswerCommentsUseCase } from './fetch_answer_comments';
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in_memory_answer_comments_repository';
import { makeAnswerComment } from 'test/factories/make_answer_comment';
import { UniqueEntityId } from '@core/entities/unique_entity_id';

// -- VARIABLES

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: FetchAnswerCommentsUseCase;

// -- STATEMENTS

describe(
    'Fetch Answer Comments',
    () =>
    {
        beforeEach(
            () =>
            {
                inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
                sut = new FetchAnswerCommentsUseCase( inMemoryAnswerCommentsRepository );
            }
            );

        it(
            'Should be able to fetch answer comments by answer id',
            async () =>
            {
                await inMemoryAnswerCommentsRepository.create( makeAnswerComment( { answerId: new UniqueEntityId( 'answer-1' ) } ) );
                await inMemoryAnswerCommentsRepository.create( makeAnswerComment( { answerId: new UniqueEntityId( 'answer-1' ) } ) );
                await inMemoryAnswerCommentsRepository.create( makeAnswerComment( { answerId: new UniqueEntityId( 'answer-1' ) } ) );

                const result = await sut.execute(
                    {
                        answerId: 'answer-1',
                        page: 1
                    }
                    );

                    expect( result.isRight() ).toBe( true );
                    expect( result.value?.answerComments ).toHaveLength( 3 );
            }
            );

        it(
            'Should be able to fetch paginated answer comments',
            async () =>
            {
                for ( let index = 1; index <= 22; index++ )
                {
                    await inMemoryAnswerCommentsRepository.create( makeAnswerComment( { answerId: new UniqueEntityId( 'answer-1' ) } ) );
                }

                const result = await sut.execute(
                    {
                        answerId: 'answer-1',
                        page: 2
                    }
                    );

                expect( result.isRight() ).toBe( true );
                expect( result.value?.answerComments ).toHaveLength( 2 );
            }
            );
    }
    );
