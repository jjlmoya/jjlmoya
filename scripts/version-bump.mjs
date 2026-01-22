import { execSync } from "child_process";
import fs from "fs";

function main() {
    try {
        const branch = execSync("git branch --show-current").toString().trim();

        let versionType = "minor";

        const isBugfix =
            branch.startsWith("fix/") ||
            branch.startsWith("bugfix/") ||
            branch.startsWith("hotfix/") ||
            branch.startsWith("patch/");

        if (isBugfix) {
            versionType = "patch";
        }

        console.log(`[Version Bump] Branch: ${branch}, Type: ${versionType}`);

        execSync(`npm version ${versionType} --no-git-tag-version`);

        execSync("git add package.json package-lock.json");

        console.log(`[Version Bump] Successfully bumped to ${versionType}`);
    } catch (error) {
        console.error("[Version Bump] Error:", error.message);
        process.exit(1);
    }
}

main();
