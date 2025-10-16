// -- TYPES

export abstract class WatchedList<T>
{
    // -- ATTRIBUTES

    public currentItems: T[];

    private initialItems: T[];
    private newItems: T[];
    private removedItems: T[];

    // -- CONSTRUCTOR

    constructor(
        initialItems?: T[]
        )
    {
        this.currentItems = initialItems || [];
        this.initialItems = initialItems || [];
        this.newItems = [];
        this.removedItems = [];
    }

    // -- INQUIRIES

    abstract compareItems(
        a: T,
        b: T
        ): boolean;

    // ~~

    public getItems(
        ): T[]
    {
        return this.currentItems;
    }

    // ~~

    public getNewItems(
        ): T[]
    {
        return this.newItems;
    }

    // ~~

    public getRemovedItems(
        ): T[]
    {
        return this.removedItems;
    }

    // ~~

    private isCurrentItem(
        item: T
        ): boolean
    {
        return (
            this.currentItems.filter(
                ( currentItem: T ) => this.compareItems( item, currentItem )
            ).length !== 0
            );
    }

    // ~~

    private isNewItem(
        item: T
        ): boolean
    {
        return (
            this.newItems.filter(
                ( newItem: T ) => this.compareItems( item, newItem )
            ).length !== 0
            );
    }

    // ~~

    private isRemovedItem(
        item: T
        ): boolean
    {
        return (
            this.removedItems.filter(
                ( removedItem: T ) => this.compareItems( item, removedItem )
            ).length !== 0
            );
    }

    // -- OPERATIONS

    private removeFromNewItems(
        item: T
        ): void
    {
        this.newItems = this.newItems.filter(
            ( newItem ) => !this.compareItems( newItem, item )
            );
    }

    // ~~

    private removeFromCurrentItems(
        item: T
        ): void
    {
        this.currentItems = this.currentItems.filter(
            ( currentItem ) => !this.compareItems( item, currentItem )
            );
    }

    // ~~

    private removeFromRemovedItems(
        item: T
        ): void
    {
        this.removedItems = this.removedItems.filter(
            ( removedItem ) => !this.compareItems( item, removedItem )
            );
    }

    // ~~

    private wasAddedInitially(
        item: T
        ): boolean
    {
        return (
            this.initialItems.filter(
                ( initialItem: T ) => this.compareItems( item, initialItem )
            ).length !== 0
            );
    }

    // ~~

    public exists(
        item: T
        ): boolean
    {
        return this.isCurrentItem( item );
    }

    // ~~

    public add(
        item: T
        ): void
    {
        if ( this.isRemovedItem( item ) )
        {
            this.removeFromRemovedItems( item );
        }

        if ( !this.isNewItem( item ) && !this.wasAddedInitially( item ) )
        {
            this.newItems.push( item );
        }

        if ( !this.isCurrentItem( item ) )
        {
            this.currentItems.push( item );
        }
    }

    // ~~

    public remove(
        item: T
        ): void
    {
        this.removeFromCurrentItems( item );

        if ( this.isNewItem( item ) )
        {
            this.removeFromNewItems( item );

            return;
        }

        if ( !this.isRemovedItem( item ) )
        {
            this.removedItems.push( item );
        }
    }

    // ~~

    public update(
        items: T[]
        ): void
    {
        const newItems: T[] = items.filter(
            ( a ) => !this.getItems().some(
                ( b ) => this.compareItems( a, b )
            )
            );

        const removedItems: T[] = this.getItems().filter(
            ( a ) => !items.some(
                ( b ) => this.compareItems( a, b )
            )
            );

        this.currentItems = items;
        this.newItems = newItems;
        this.removedItems = removedItems;
    }
}
