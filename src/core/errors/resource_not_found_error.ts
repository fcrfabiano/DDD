// -- IMPORTS

import { UseCaseError } from '@core/errors/use_case_error';

// -- TYPES

export class ResourceNotFoundError extends Error implements UseCaseError
{
    // -- CONSTRUCTOR

    constructor(
        )
    {
        super( 'Resource not found' );
    }
}