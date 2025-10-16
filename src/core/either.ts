// -- TYPES

abstract class ErrorBase<L, R>
{
    // -- ATTRIBUTES

    abstract readonly value: L | R;

    // -- INQUIRIES

    isLeft(
        ): this is Left<L, R>
    {
        return ( this instanceof Left );
    }

    // ~~

    isRight(
        ): this is Right<L, R>
    {
        return ( this instanceof Right );
    }
}

export class Left<L, R> extends ErrorBase<L, R>
{
    // -- ATTRIBUTES

    readonly value: L;

    // -- CONSTRUCTOR

    constructor(
        value: L
        )
    {
        super();
        this.value = value;
    }
}

// ~~

export class Right<L, R> extends ErrorBase<L, R>
{
    // -- ATTRIBUTES

    readonly value: R;

    // -- CONSTRUCTOR

    constructor(
        value: R
        )
    {
        super();
        this.value = value;
    }
}

// -- TYPES

export type Either<L, R> = Left<L, R> | Right<L, R>;

// -- FUNCTIONS

export function left<L, R>(
    value: L
    ): Either<L, R>
{
    return new Left( value );
}

// ~~

export function right<L, R>(
        value: R
    ): Either<L, R>
{
    return new Right( value );
}