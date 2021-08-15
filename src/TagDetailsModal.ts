import { App, Modal } from "obsidian";
import { Tag } from "./Tag";
import { TagPageFinder } from "./TagPageFinder";
import { createLink } from "./utils/render";

export class TagDetailsModal extends Modal {
  constructor(app: App, private tag: Tag, private finder: TagPageFinder) {
    super(app);
  }
  onOpen() {
    let { contentEl } = this;
    const header = document.createElement("h2");
    header.setText(`Pages with ${this.tag.tag}`);
    contentEl.appendChild(header);

    const pages = this.finder.pages();
    if (!pages.length) {
      const emptyMessage = document.createElement("p");
      emptyMessage.setText("There are no pages containing this tag");
      contentEl.appendChild(emptyMessage);
    } else {
      const list = document.createElement("ol");
      pages.forEach((page) => {
        const el = document.createElement("li");
        const link = createLink(this.app, page, () => this.close());
        el.appendChild(link);
        list.appendChild(el);
      });
      contentEl.appendChild(list);
    }
  }
  onClose() {
    let { contentEl } = this;
    contentEl.empty();
  }
}
