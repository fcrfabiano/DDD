// -- IMPORTS

import { FetchQuestionCommentsUseCase } from './fetch_question_comments';
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in_memory_question_comments_repository';
import { makeQuestionComment } from 'test/factories/make_question_comment';
import { UniqueEntityId } from '@core/entities/unique_entity_id';

// -- VARIABLES

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: FetchQuestionCommentsUseCase;

// -- STATEMENTS

describe(
    'Fetch Question Comments',
    () =>
    {
        beforeEach(
            () =>
            {
                inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository();
                sut = new FetchQuestionCommentsUseCase( inMemoryQuestionCommentsRepository );
            }
            );

        it(
            'Should be able to fetch question comments by question id',
            async () =>
            {
                await inMemoryQuestionCommentsRepository.create( makeQuestionComment( { questionId: new UniqueEntityId( 'question-1' ) } ) );
                await inMemoryQuestionCommentsRepository.create( makeQuestionComment( { questionId: new UniqueEntityId( 'question-1' ) } ) );
                await inMemoryQuestionCommentsRepository.create( makeQuestionComment( { questionId: new UniqueEntityId( 'question-1' ) } ) );

                const result = await sut.execute(
                    {
                        questionId: 'question-1',
                        page: 1
                    }
                    );

                expect( result.isRight() ).toBe( true );
                expect( result.value?.questionComments ).toHaveLength( 3 );
            }
            );

        it(
            'Should be able to fetch paginated question comments',
            async () =>
            {
                for ( let index = 1; index <= 22; index++ )
                {
                    await inMemoryQuestionCommentsRepository.create( makeQuestionComment( { questionId: new UniqueEntityId( 'question-1' ) } ) );
                }

                const result = await sut.execute(
                    {
                        questionId: 'question-1',
                        page: 2
                    }
                    );

                expect( result.isRight() ).toBe( true );
                expect( result.value?.questionComments ).toHaveLength( 2 );
            }
            );
    }
    );
