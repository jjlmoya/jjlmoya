
import { ALL_APP_DEFINITIONS } from "@jjlmoya/apps";

async function check() {
    for (const definition of ALL_APP_DEFINITIONS) {
        console.log(`--- App: ${definition.entry.id} ---`);
        console.log(JSON.stringify(definition, (key, value) => typeof value === 'function' ? '[Function]' : value, 2));
    }
}

check();
