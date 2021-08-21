import { Plugin } from "obsidian";
import { Tag } from "./Tag";
import { TagDetailsModal } from "./TagDetailsModal";

export default class TagPagePreview extends Plugin {
  private modal: TagDetailsModal;

  async onload() {
    this.modal = new TagDetailsModal(this.app);

    this.registerDomEvent(document, "click", (evt: MouseEvent) => {
      this.handleClick(evt.target as HTMLElement);
    });
  }

  private handleClick(target: HTMLElement) {
    if (!Tag.isTagNode(target)) return;
    const tag = Tag.create(target);
    this.modal.setTag(tag).open();
  }
}
