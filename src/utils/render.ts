import { App, TFile } from "obsidian";

function isWindows(): boolean {
  return navigator.platform.includes("Win");
}
function isMetaKey(event: MouseEvent): boolean {
  if (isWindows()) return event.ctrlKey;
  return event.metaKey;
}
async function openLink(
  app: App,
  dest: string,
  currFile: TFile,
  event: MouseEvent
): Promise<void> {
  const destFile = app.metadataCache.getFirstLinkpathDest(dest, currFile.path);
  const mode = (app.vault as any).getConfig("defaultViewMode");
  const leaf = isMetaKey(event)
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
  console.log(navigator.platform);
  const link = createTextContent("a", file.basename);
  link.style.cursor = "pointer";
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

export function createTextContent<K extends keyof HTMLElementTagNameMap>(
  element: K,
  content: string
): HTMLElementTagNameMap[K] {
  const el = document.createElement(element);
  el.setText(content);
  return el;
}
