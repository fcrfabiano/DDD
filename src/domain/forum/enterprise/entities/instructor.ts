// -- IMPORTS

import { UniqueEntityId } from '@core/entities/unique_entity_id';
import { Entity } from '@core/entities/entity';

// -- TYPES

interface InstructorProps
{
    name: string;
}

export class Instructor extends Entity<InstructorProps>
{
    // -- OPERATIONS

    static create(
        props: InstructorProps,
        id?: UniqueEntityId
        )
    {
        const instructor = new Instructor( props, id );

        return instructor;
    }
}