// -- TYPES

export class UniqueEntityId
{
    // -- ATRIBUTES

    private value: string;

    // -- CONSTRUCTOR

    constructor(
        value?: string
        )
    {
        this.value = value ?? crypto.randomUUID();
    }

    // -- INQUIRIES

    toString(
        )
    {
        return this.value;
    }
    
    // ~~

    toValue(
        )
    {
        return this.value;
    }

    // -- OPERATIONS

    public equals(
        id: UniqueEntityId
        )
    {
        return id.toValue() === this.value;
    }
}