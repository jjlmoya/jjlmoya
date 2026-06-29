import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const args = process.argv.slice(2);
const dateInput = args[0] || new Date().toISOString().split("T")[0];
const targetDateTime = `${dateInput} 23:59:59`;

function getCommandOutput(cmd, cwd) {
    try {
        return execSync(cmd, { cwd, stdio: "pipe" }).toString().trim();
    } catch {
        return "";
    }
}

const mainRepoPath = process.cwd();

const registryCommit = getCommandOutput(
    `git log --until="${targetDateTime}" -n 1 --pretty=format:"%H" -- src/i18n/toolRegistry.ts`,
    mainRepoPath
);

if (!registryCommit) {
    console.error(`Could not find a commit for src/i18n/toolRegistry.ts before ${dateInput}`);
    process.exit(1);
}

const registryContent = getCommandOutput(
    `git show ${registryCommit}:src/i18n/toolRegistry.ts`,
    mainRepoPath
);

const packageRegex = /"@jjlmoya\/utils-([a-z0-9-]+)"/g;
const matches = [];
let match;
while ((match = packageRegex.exec(registryContent)) !== null) {
    if (!matches.includes(match[1])) {
        matches.push(match[1]);
    }
}

if (matches.length === 0) {
    console.error(`No packages found registered in toolRegistry.ts as of ${dateInput}`);
    process.exit(1);
}

console.log(`Date: ${dateInput}`);
console.log(`Registered categories/packages: ${matches.length}\n`);

let grandTotal = 0;

for (const suffix of matches) {
    const repoDirName = `jjlmoya-utils-${suffix}`;
    const repoPath = path.resolve(mainRepoPath, "..", repoDirName);

    if (!fs.existsSync(repoPath)) {
        console.log(`[Category: ${suffix}] Repo not found locally at ${repoPath}`);
        continue;
    }

    const commitHash = getCommandOutput(
        `git log --until="${targetDateTime}" -n 1 --pretty=format:"%H"`,
        repoPath
    );

    if (!commitHash) {
        console.log(`[Category: ${suffix}] No commits found before ${dateInput}`);
        continue;
    }

    const lsTreeOutput = getCommandOutput(
        `git ls-tree -d --name-only ${commitHash} src/tool/`,
        repoPath
    );

    const tools = lsTreeOutput
        ? lsTreeOutput.split("\n").map(line => path.basename(line))
        : [];

    const count = tools.length;
    grandTotal += count;

    console.log(`[Category: ${suffix}] Count: ${count}`);
    if (count > 0) {
        console.log(`  Tools: ${tools.join(", ")}`);
    }
    console.log("");
}

console.log(`----------------------------------------`);
console.log(`TOTAL TOOLS ON ${dateInput}: ${grandTotal}`);
