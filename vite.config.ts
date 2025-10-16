// -- IMPORTS

import { defineConfig } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';

// -- STATEMENTS

export default defineConfig(
    {
        plugins: [ tsConfigPaths() ],
        test:
            {
                globals: true
            }
    }
    );