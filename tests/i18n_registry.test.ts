import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { REGISTERED_PACKAGES } from "../src/i18n/toolRegistry";

const pkg = JSON.parse(readFileSync("package.json", "utf-8"));
const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };
const utilPackages: string[] = Object.keys(allDeps).filter((k: string) =>
    k.startsWith("@jjlmoya/utils-")
);

describe("i18n registry", () => {
    it("every @jjlmoya/utils-* in package.json is registered in toolRegistry.ts", () => {
        for (const pkgName of utilPackages) {
            expect(
                REGISTERED_PACKAGES.has(pkgName),
                `"${pkgName}" is installed but not registered in src/i18n/toolRegistry.ts — add it to register() and REGISTERED_PACKAGES`
            ).toBe(true);
        }
    });

    it("no package is registered in toolRegistry.ts without being in package.json", () => {
        const installedSet = new Set(utilPackages);
        for (const pkgName of REGISTERED_PACKAGES) {
            expect(
                installedSet.has(pkgName),
                `"${pkgName}" is in REGISTERED_PACKAGES but not in package.json`
            ).toBe(true);
        }
    });
});
