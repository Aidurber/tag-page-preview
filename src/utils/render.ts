import { App, TFile } from "obsidian";

async function openLink(
  app: App,
  dest: string,
  currFile: TFile,
  event: MouseEvent
): Promise<void> {
  const destFile = app.metadataCache.getFirstLinkpathDest(dest, currFile.path);
  const mode = (app.vault as any).getConfig("defaultViewMode");
  const leaf = event.ctrlKey
    ? app.workspace.splitActiveLeaf()
    : app.workspace.getUnpinnedLeaf();
  await leaf.openFile(destFile, { active: true, mode });
}
/**
 * Create a native-ish obsidian link
 * @param app - Obsidian App
 * @param file - File to link
 * @param onClick - Optional: onClick callback
 * @returns
 */
export function createLink(
  app: App,
  file: TFile,
  onClick?: (e: MouseEvent) => void
): HTMLAnchorElement {
  const link = document.createElement("a");
  link.style.cursor = "pointer";
  link.setText(file.basename);
  link.dataset.href = file.path;
  link.classList.add("internal-link");
  link.onclick = (e: MouseEvent) => {
    openLink(app, file.path, file, e);
    if (typeof onClick === "function") {
      onClick(e);
    }
  };
  return link;
}
