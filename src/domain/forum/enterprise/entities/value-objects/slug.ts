// -- TYPES

export class Slug
{
    // -- ATTRIBUTES

    public value: string;

    // -- CONSTRUCTORS

    private constructor(
        value : string
        )
    {
        this.value = value;
    }

    // -- INQUIRIES


    // -- OPERATIONS

    static create(
        slug : string
        )
    {
        return new Slug( slug );
    }

    /**
     * Receives a string and creates a slug from it.
     *
     * Example: "An example title" => "an-example-title"
     *
     * @param text { string }
     */

    static createFromText(
        text : string
        )
    {
        let slugText = text.normalize( 'NFD' )
            .toLowerCase()
            .trim()
            .replace( /[\u0300-\u036f]/g, '' )
            .replace( /[^a-z0-9\s-]/g, '' )
            .replace( /\s+/g, '-' )
            .replace( /-+/g, '-' );

        return new Slug( slugText );
    }
}