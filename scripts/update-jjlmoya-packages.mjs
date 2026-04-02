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
        
        const jjlmoyaDeps = Object.keys(allDeps).filter(name => name.startsWith("@jjlmoya/"));

        if (jjlmoyaDeps.length === 0) {
            console.log("No se encontraron dependencias del namespace @jjlmoya.");
            return;
        }

        const changes = [];

        for (const name of jjlmoyaDeps) {
            const currentRaw = allDeps[name];
            const current = currentRaw.replace(/[\^~]/, "");
            
            try {
                const latest = execSync(`npm view ${name} version`).toString().trim();

                if (current !== latest) {
                    console.log(`${COLOR.CYAN}[ACTUALIZANDO]${COLOR.RESET} ${name}: ${current} -> ${latest}`);
                    changes.push({ name, isDev: !!devDependencies[name] });
                } else {
                    console.log(`${COLOR.GREEN}[OK]${COLOR.RESET} ${name} ya está en la última versión (${latest})`);
                }
            } catch (error) {
                console.log(`${COLOR.YELLOW}[ERROR]${COLOR.RESET} No se pudo comprobar ${name}`);
            }
        }

        const depsToInstall = changes.filter(c => !c.isDev).map(c => `${c.name}@latest`);
        const devDepsToInstall = changes.filter(c => c.isDev).map(c => `${c.name}@latest`);

        if (depsToInstall.length > 0) {
            execSync(`npm install ${depsToInstall.join(" ")}`, { stdio: "inherit" });
        }

        if (devDepsToInstall.length > 0) {
            execSync(`npm install ${devDepsToInstall.join(" ")} --save-dev`, { stdio: "inherit" });
        }

        if (changes.length > 0) {
            console.log(`Actualización finalizada. Se actualizaron ${changes.length} librerías.`);
        }

    } catch (error) {
        process.exit(1);
    }
}

main();
