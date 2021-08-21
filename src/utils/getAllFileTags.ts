import { App, TFile, getAllTags } from "obsidian";
import { Tag } from "../Tag";

export interface TTagFile {
  file: TFile;
  tags: string[];
}
export function getAllFilesMatchingTag(app: App, tag: Tag): Set<TFile> {
  const files = app.vault.getFiles();
  const result: Set<TFile> = new Set();
  for (let file of files) {
    const tags = getAllTags(app.metadataCache.getCache(file.path)) || [];
    if (!tags.length) continue;

    if (tags.indexOf(tag.tag) > -1) {
      result.add(file);
    }
  }

  return result;
}
