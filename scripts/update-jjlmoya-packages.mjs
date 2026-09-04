import { readFileSync } from "fs";
import { execSync } from "child_process";

const COLOR = {
    RESET: "\x1b[0m",
    GREEN: "\x1b[32m",
    YELLOW: "\x1b[33m",
    CYAN: "\x1b[36m"
};

function main() {
    try {
        const pkgData = readFileSync("package.json", "utf8");
        const pkg = JSON.parse(pkgData);

        const dependencies = pkg.dependencies || {};
        const devDependencies = pkg.devDependencies || {};
        const allDeps = { ...dependencies, ...devDependencies };

        const filter = process.argv[2];
        let jjlmoyaDeps = Object.keys(allDeps).filter(name => name.startsWith("@jjlmoya/"));

        if (filter) {
            jjlmoyaDeps = jjlmoyaDeps.filter(name => name.includes(filter));
        }

        if (jjlmoyaDeps.length === 0) {
            console.log(filter
                ? `No se encontraron dependencias que coincidan con "${filter}".`
                : "No se encontraron dependencias del namespace @jjlmoya."
            );
            return;
        }

        const changes = [];
        const failures = [];

        for (const name of jjlmoyaDeps) {
            const currentRaw = allDeps[name];
            const current = currentRaw.replace(/[\^~]/, "");
            const isExact = currentRaw === current;

            try {
                const latest = execSync(`npm view ${name} version`).toString().trim();

                if (current !== latest || !isExact) {
                    const target = current === latest ? `${latest} (version exacta)` : latest;
                    console.log(`${COLOR.CYAN}[ACTUALIZANDO]${COLOR.RESET} ${name}: ${currentRaw} -> ${target}`);
                    changes.push({ name, isDev: !!devDependencies[name] });
                } else {
                    console.log(`${COLOR.GREEN}[OK]${COLOR.RESET} ${name} ya está en la última versión (${latest})`);
                }
            } catch (error) {
                console.log(`${COLOR.YELLOW}[ERROR]${COLOR.RESET} No se pudo comprobar ${name}`);
                failures.push(name);
            }
        }

        if (failures.length > 0) {
            throw new Error(`No se pudieron comprobar: ${failures.join(", ")}`);
        }

        const depsToInstall = changes.filter(c => !c.isDev).map(c => `${c.name}@latest`);
        const devDepsToInstall = changes.filter(c => c.isDev).map(c => `${c.name}@latest`);

        if (depsToInstall.length > 0) {
            execSync(`npm install ${depsToInstall.join(" ")} --save-exact`, { stdio: "inherit" });
        }

        if (devDepsToInstall.length > 0) {
            execSync(`npm install ${devDepsToInstall.join(" ")} --save-dev --save-exact`, { stdio: "inherit" });
        }

        if (changes.length > 0) {
            console.log(`Actualización finalizada. Se actualizaron ${changes.length} librerías.`);
        }

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

main();
