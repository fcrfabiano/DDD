// -- IMPORTS

import { UseCaseError } from '@core/errors/use_case_error';

// -- TYPES

export class NotAllowedError extends Error implements UseCaseError
{
    // -- CONSTRUCTOR

    constructor(
        )
    {
        super( 'Not allowed' );
    }
}