// -- IMPORTS

import { UniqueEntityId } from '@core/entities/unique_entity_id';
import { DeleteAnswerUseCase } from './delete_answer';
import { AnswersRepository } from '@domain/forum/application/repositories/answers_repository';
import { Answer } from '@domain/forum/enterprise/entities/answer';
import { makeAnswer } from 'test/factories/make_answer';
import { InMemoryAnswersRepository } from 'test/repositories/in_memory_answers_repository';
import { NotAllowedError } from '../../../../core/errors/not_allowed_error';
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in_memory_answer_attachments_repository';

// -- VARIABLES

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: DeleteAnswerUseCase;

// -- STATEMENTS

describe(
    'Delete Answer',
    () =>
    {
        beforeEach(
            () =>
            {
                inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository();
                inMemoryAnswersRepository = new InMemoryAnswersRepository( inMemoryAnswerAttachmentsRepository );
                sut = new DeleteAnswerUseCase( inMemoryAnswersRepository );
            }
            );

        it(
            'Should be able to delete a answer',
            async () =>
            {
                const newAnswer = makeAnswer(
                    {
                        authorId: new UniqueEntityId( 'author-1' )
                    },
                    new UniqueEntityId( 'answer-1' )
                    );

                await inMemoryAnswersRepository.create( newAnswer );

                await sut.execute(
                    {
                        answerId: 'answer-1',
                        authorId: 'author-1'
                    }
                    );
        
                expect( inMemoryAnswersRepository.items ).toHaveLength( 0 );
            }
            );

        it(
            'Should not be able to delete a answer from another user',
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
                        answerId: 'answer-1',
                        authorId: 'author-2'
                    }
                    );

                expect( result.isLeft() ).toBe( true );
                expect( result.value ).toBeInstanceOf( NotAllowedError );
    
            }
            );
    }
    );
