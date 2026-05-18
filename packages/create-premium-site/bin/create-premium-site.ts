#!/usr/bin/env tsx
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { askQuestions, confirmOverwrite } from "../src/questions";
import { maybeGenerateAiContent } from "../src/ai-generate";
import { configureProject, runCommand } from "../src/configure";
import { getTargetPath, scaffoldProject } from "../src/scaffold";
import { logger } from "../src/logger";

async function main() {
  logger.step("Create Premium Site");
  const answers = await askQuestions();
  const targetPath = getTargetPath(answers.projectName);

  if (existsSync(targetPath)) {
    const overwrite = await confirmOverwrite(targetPath);
    if (!overwrite) {
      logger.warning("Abgebrochen: Zielverzeichnis existiert bereits und wurde nicht überschrieben.");
      return;
    }
    answers.overwriteExisting = true;
  }

  logger.step("Projekt scaffolden");
  const scaffold = await scaffoldProject(answers);

  logger.step("Projekt konfigurieren");
  await configureProject(scaffold.targetPath, answers);
  logger.success("Konfigurationsdateien angepasst.");

  const aiGenerated = await maybeGenerateAiContent(scaffold.targetPath, answers);

  logger.step("Dependencies installieren");
  const install = await runCommand("npm", ["install"], scaffold.targetPath);
  if (!install.ok) {
    logger.warning(`npm install ist fehlgeschlagen. Das Projekt bleibt bestehen. Bitte manuell ausführen: cd ${scaffold.targetPath} && npm install`);
  } else {
    logger.success("npm install erfolgreich.");
  }

  logger.step("Build ausführen");
  const build = await runCommand("npm", ["run", "build"], scaffold.targetPath);
  if (!build.ok) {
    logger.warning(`npm run build ist fehlgeschlagen. Bitte prüfen: cd ${scaffold.targetPath} && npm run build`);
  } else {
    logger.success("npm run build erfolgreich.");
  }

  logger.summary("Create Premium Site abgeschlossen", [
    { label: "Projekt", value: answers.projectName },
    { label: "Pfad", value: resolve(scaffold.targetPath) },
    { label: "Marke", value: answers.brandName },
    { label: "Branche", value: answers.industry },
    { label: "Theme", value: answers.theme },
    { label: "Sections", value: answers.sections.join(", ") },
    { label: "CTA", value: answers.ctaType },
    { label: "Waitlist", value: answers.waitlistMode ? "ja" : "nein" },
    { label: "AI Inhalte", value: aiGenerated ? "generiert" : "nicht generiert" },
    { label: "Install", value: install.ok ? "erfolgreich" : "fehlgeschlagen" },
    { label: "Build", value: build.ok ? "erfolgreich" : "fehlgeschlagen" },
  ]);
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : "Unbekannter Fehler";
  logger.error(message);
  process.exit(1);
});
