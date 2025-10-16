// -- IMPORTS

import { UniqueEntityId } from './unique_entity_id';

// -- TYPES

export abstract class Entity<T>
{
    // -- ATTRIBUTES

    private _id: UniqueEntityId;
    protected props: T;

    // -- CONSTRUCTOR

    protected constructor(
        props: T,
        id?: UniqueEntityId
        )
    {
        this.props = props;
        this._id = id ?? new UniqueEntityId();
    }

    // -- INQUIRIES

    get id(
        )
    {
        return this._id;
    }

    // -- OPERATIONS

    public equals(
        entity: Entity<any>
        )
    {
        if ( entity === this )
        {
            return true;
        }

        if ( entity.id === this._id )
        {
            return true;
        }

        return false;
    }
}