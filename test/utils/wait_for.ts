// -- FUNCTIONS

export async function waitFor(
    assertions: () => void,
    maximumDuration = 1000
    ): Promise<void>
{
    return new Promise(
        ( resolve, reject ) =>
        {
            let elapsedTime = 0;

            const interval = setInterval(
                () =>
                {
                    elapsedTime += 10;
                
                    try
                    {
                        assertions();
                        clearInterval( interval );
                        resolve();
                    }
                    catch ( error )
                    {
                        if ( elapsedTime >= maximumDuration )
                        {
                            reject( error );
                        }
                    }
                },
                10
                );
        }
        );
}