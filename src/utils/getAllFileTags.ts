import { App, TagCache, TFile } from "obsidian";

export interface TTagFile {
  file: TFile;
  tags: string[];
}
export function getAllFileTags(app: App): TTagFile[] {
  const files = app.vault.getFiles();
  let cache: TTagFile[] = [];
  for (let file of files) {
    if (!file) continue;
    const tags = app.metadataCache
      .getFileCache(file)
      ?.tags?.map((tag) => tag.tag);
    if (!tags?.length) continue;
    cache.push({ file, tags });
  }

  return cache;
}
