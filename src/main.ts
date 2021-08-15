import { Plugin } from "obsidian";
import { TagDetailsModal } from "./TagDetailsModal";
import { TagPageFinder } from "./TagPageFinder";
import { getTagContent, isTagElement } from "./utils/isTagElement";

export default class TagPagePreview extends Plugin {
  async onload() {
    this.registerDomEvent(document, "click", (evt: MouseEvent) => {
      this.handleClick(evt.target as HTMLElement);
    });
  }

  private handleClick(target: HTMLElement) {
    if (!isTagElement(target)) return;
    const tag = getTagContent(target);
    new TagDetailsModal(this.app, tag, new TagPageFinder(this.app, tag)).open();
  }
}
