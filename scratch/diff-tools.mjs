import { execSync } from "child_process";
import fs from "fs";
import path from "path";

function getToolsForDate(dateInput) {
    const targetDateTime = `${dateInput} 23:59:59`;
    const mainRepoPath = process.cwd();

    const registryCommit = execSync(
        `git log --until="${targetDateTime}" -n 1 --pretty=format:"%H" -- src/i18n/toolRegistry.ts`,
        { cwd: mainRepoPath }
    ).toString().trim();

    if (!registryCommit) return new Map();

    const registryContent = execSync(
        `git show ${registryCommit}:src/i18n/toolRegistry.ts`,
        { cwd: mainRepoPath }
    ).toString().trim();

    const packageRegex = /"@jjlmoya\/utils-([a-z0-9-]+)"/g;
    const matches = [];
    let match;
    while ((match = packageRegex.exec(registryContent)) !== null) {
        if (!matches.includes(match[1])) {
            matches.push(match[1]);
        }
    }

    const allTools = new Map();
    for (const suffix of matches) {
        const repoPath = `../jjlmoya-utils-${suffix}`;
        try {
            const commitHash = execSync(
                `git log --until="${targetDateTime}" -n 1 --pretty=format:"%H"`,
                { cwd: repoPath }
            ).toString().trim();

            if (!commitHash) continue;

            const lsTreeOutput = execSync(
                `git ls-tree -d --name-only ${commitHash} src/tool/`,
                { cwd: repoPath }
            ).toString().trim();

            if (lsTreeOutput) {
                lsTreeOutput.split("\n").forEach(line => {
                    const toolId = line.split("/").pop();
                    allTools.set(toolId, suffix);
                });
            }
        } catch { }
    }
    return allTools;
}

const mayTools = getToolsForDate("2026-05-31");
const juneTools = getToolsForDate("2026-06-30");

const newToolsList = [];

for (const [toolId, suffix] of juneTools.entries()) {
    if (!mayTools.has(toolId)) {
        newToolsList.push({ toolId, suffix });
    }
}

const result = [];
const SLUG_RE = /const\s+slug\s*=\s*['"]([^'"]+)['"]/;
const TITLE_RE = /const\s+title\s*=\s*['"]([^'"]+)['"]/;

for (const { toolId, suffix } of newToolsList) {
    const repoPath = `../jjlmoya-utils-${suffix}`;
    const esFile = path.join(repoPath, "src", "tool", toolId, "i18n", "es.ts");

    let slug = toolId;
    let title = toolId;

    if (fs.existsSync(esFile)) {
        const content = fs.readFileSync(esFile, "utf8");
        const slugMatch = content.match(SLUG_RE);
        const titleMatch = content.match(TITLE_RE);
        if (slugMatch) slug = slugMatch[1];
        if (titleMatch) title = titleMatch[1];
    }

    result.push({
        toolId,
        category: suffix,
        slug,
        title
    });
}

const grouped = {};
for (const item of result) {
    if (!grouped[item.category]) {
        grouped[item.category] = [];
    }
    grouped[item.category].push(item);
}

for (const [category, items] of Object.entries(grouped)) {
    console.log(`\n### ${category.toUpperCase()}`);
    for (const item of items) {
        console.log(`- **${item.title}**: https://www.jjlmoya.es/utilidades/${item.slug}/`);
    }
}
