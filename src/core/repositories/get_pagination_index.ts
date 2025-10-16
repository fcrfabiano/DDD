// -- IMPORTS

import { PaginationParams } from './pagination_params';

// -- FUNCTIONS

export function getPaginationIndexByPage(
    { page }: PaginationParams
    )
{
    const startIndex = ( page - 1 ) * 20;
    const endIndex = page * 20;

    return (
        {
            startIndex,
            endIndex
        }
        );
}