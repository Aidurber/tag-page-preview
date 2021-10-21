import { App, TFile, getAllTags } from "obsidian";
import { Tag } from "../Tag";

export function getAllVaultTags(app: App): Set<string> {
  const files = app.vault.getMarkdownFiles();
  const result = new Set<string>();
  for (let file of files) {
    const tags = getAllTags(app.metadataCache.getCache(file.path)) || [];
    if (!tags.length) continue;
    for (let tag of tags) {
      // Lower case tags as get fetch them
      result.add(tag.toLocaleLowerCase());
    }
  }
  return result;
}
/**
 * Returns a Set of files that contain a given tag
 * @param app - Obsidian app object
 * @param tag - Tag to find
 * @returns
 */
export function getAllFilesMatchingTag(app: App, tag: Tag): Set<TFile> {
  const files = app.vault.getMarkdownFiles();
  const result: Set<TFile> = new Set();
  for (let file of files) {
    const tags = getAllTags(app.metadataCache.getCache(file.path)) || [];
    if (!tags.length || tags.indexOf(tag.tag) === -1) continue;
    result.add(file);
  }

  return result;
}
