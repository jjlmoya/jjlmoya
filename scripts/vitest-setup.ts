import { register } from 'module';
import { fileURLToPath } from 'url';

// Register the Astro loader to handle .astro imports in tests
register(new URL('./astro-loader.mjs', import.meta.url));
