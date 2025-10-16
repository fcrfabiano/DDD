// -- IMPORTS

import { Either, left, right } from './either';

// -- FUNCTIONS

function doSomething(
    shouldSuccess: boolean
    ): Either<string, number>
{
    if ( shouldSuccess )
    {
        return right( 10 );
    }

    return left( 'error' );
}

// -- STATEMENTS

test(
    'Success result',
    () =>
    {
        const successResult = doSomething( true );

        expect( successResult.isRight() ).toBe( true );
        expect( successResult.isLeft() ).toBe( false );
    }
    );

// ~~

test(
    'Error result',
    () =>
    {
        const errorResult = doSomething( false );

        expect( errorResult.isLeft() ).toBe( true );
        expect( errorResult.isRight() ).toBe( false );
    }
    );