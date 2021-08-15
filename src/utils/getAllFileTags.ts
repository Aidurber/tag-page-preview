import { App, TagCache, TFile } from "obsidian";

export interface TTagFile {
  file: TFile;
  tags: string[];
}
export function getAllFileTags(app: App): TTagFile[] {
  const files = app.vault.getFiles();
  const cache = files
    .map((file) => ({
      file,
      tags: app.metadataCache.getFileCache(file)?.tags?.map((tag) => tag.tag),
    }))
    .filter((f) => f.tags?.length > 0);

  return cache;
}
