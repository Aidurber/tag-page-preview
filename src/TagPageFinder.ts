import { App, TFile } from "obsidian";
import { Tag } from "./Tag";
import { getAllFileTags } from "./utils/getAllFileTags";

export class TagPageFinder {
  constructor(protected app: App, protected tag: Tag) {}

  pages(): TFile[] {
    console.log(this.app);

    const fileTags = getAllFileTags(this.app);
    let matches: TFile[] = [];
    for (let i = 0, len = fileTags.length; i < len; i++) {
      const item = fileTags[i];
      if (item.tags.includes(this.tag.tag)) {
        matches.push(item.file);
      }
    }
    return matches;
  }
}
