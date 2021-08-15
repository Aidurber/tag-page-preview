import { Plugin } from "obsidian";
import { Tag } from "./Tag";
import { TagDetailsModal } from "./TagDetailsModal";
import { TagPageFinder } from "./TagPageFinder";

export default class TagPagePreview extends Plugin {
  async onload() {
    this.registerDomEvent(document, "click", (evt: MouseEvent) => {
      this.handleClick(evt.target as HTMLElement);
    });
  }

  private handleClick(target: HTMLElement) {
    if (!Tag.isTagNode(target)) return;
    const tag = Tag.create(target);
    new TagDetailsModal(this.app, tag, new TagPageFinder(this.app, tag)).open();
  }
}
