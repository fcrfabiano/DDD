// -- IMPORTS

import { Entity } from '@core/entities/entity';
import { UniqueEntityId } from '@core/entities/unique_entity_id';

// -- TYPES

interface StudentProps
{
    name: string;
}

export class Student extends Entity<StudentProps>
{
    // -- OPERATIONS

    static create(
        props: StudentProps,
        id?: UniqueEntityId
        )
    {
        const student = new Student( props, id );

        return student;
    }
}