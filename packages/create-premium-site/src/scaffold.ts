import { resolve } from "node:path";
import * as fs from "fs-extra";
import ora from "ora";
import type { UserAnswers } from "./questions";

export interface ScaffoldResult {
  sourcePath: string;
  targetPath: string;
}

const IGNORED_NAMES = new Set(["node_modules", ".next", ".git", "out"]);

function repoRootFromCliPackage(): string {
  return process.cwd();
}

function shouldCopy(src: string): boolean {
  const name = src.split(/[\\/]/).pop() ?? "";
  if (IGNORED_NAMES.has(name)) return false;
  if (name.endsWith(".generated.ts")) return false;
  return true;
}

function updatePackageName(targetPath: string, projectName: string): void {
  const packageJsonPath = resolve(targetPath, "package.json");
  const packageJson = fs.readJsonSync(packageJsonPath) as { name?: string };
  packageJson.name = projectName;
  fs.writeJsonSync(packageJsonPath, packageJson, { spaces: 2 });
}

export function getTargetPath(projectName: string): string {
  return resolve(repoRootFromCliPackage(), "..", projectName);
}

export async function scaffoldProject(answers: UserAnswers): Promise<ScaffoldResult> {
  const sourcePath = repoRootFromCliPackage();
  const targetPath = getTargetPath(answers.projectName);
  const spinner = ora(`Kopiere Starter Kit nach ${targetPath}`).start();

  try {
    if (answers.overwriteExisting) {
      await fs.remove(targetPath);
    }

    await fs.copy(sourcePath, targetPath, { filter: shouldCopy });
    updatePackageName(targetPath, answers.projectName);
    spinner.succeed("Starter Kit kopiert");
    return { sourcePath, targetPath };
  } catch (error) {
    spinner.fail("Starter Kit konnte nicht kopiert werden");
    throw error;
  }
}
