import { App, TFile, getAllTags } from "obsidian";
import { Tag } from "../Tag";

/**
 * Returns a Set of files that contain a given tag
 * @param app - Obsidian app object
 * @param tag - Tag to find
 * @returns
 */
export function getAllFilesMatchingTag(app: App, tag: Tag): Set<TFile> {
  const files = app.vault.getFiles();
  const result: Set<TFile> = new Set();
  for (let file of files) {
    const tags = getAllTags(app.metadataCache.getCache(file.path)) || [];
    if (!tags.length || !tags.includes(tag.tag)) continue;
    result.add(file);
  }

  return result;
}
