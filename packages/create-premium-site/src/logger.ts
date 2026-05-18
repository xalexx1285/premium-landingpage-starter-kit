import * as pc from "picocolors";

export interface SummaryItem {
  label: string;
  value: string;
}

export const logger = {
  info(message: string) {
    console.log(`${pc.cyan("ℹ")} ${message}`);
  },

  success(message: string) {
    console.log(`${pc.green("✓")} ${message}`);
  },

  warning(message: string) {
    console.log(`${pc.yellow("⚠")} ${message}`);
  },

  error(message: string) {
    console.error(`${pc.red("✕")} ${message}`);
  },

  step(message: string) {
    console.log(`\n${pc.bold(pc.cyan("▶"))} ${pc.bold(message)}`);
  },

  summary(title: string, items: SummaryItem[]) {
    console.log(`\n${pc.bold(pc.green(title))}`);
    for (const item of items) {
      console.log(`${pc.dim("-")} ${pc.bold(item.label)}: ${item.value}`);
    }
  },
};
