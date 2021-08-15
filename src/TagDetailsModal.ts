import { App, Modal } from "obsidian";
import { Tag } from "./Tag";
import { TagPageFinder } from "./TagPageFinder";
import { createHeader, createLink, createParagraph } from "./utils/render";

export class TagDetailsModal extends Modal {
  constructor(app: App, private tag: Tag, private finder: TagPageFinder) {
    super(app);
  }
  onOpen() {
    this.renderContent();
  }

  onClose() {
    let { contentEl } = this;
    contentEl.empty();
  }

  private renderContent() {
    let { contentEl } = this;
    const pages = this.finder.pages();
    const fragment = document.createDocumentFragment();
    const header = createHeader("h2", `Pages with ${this.tag.tag}`);
    fragment.appendChild(header);
    if (pages.length > 0) {
      const list = document.createElement("ol");
      for (let page of pages) {
        const el = document.createElement("li");
        const link = createLink(this.app, page, () => this.close());
        el.appendChild(link);
        fragment.appendChild(el);
      }
      list.appendChild(fragment);
      fragment.appendChild(list);
      contentEl.appendChild(fragment);
      return;
    }
    const emptyMessage = createParagraph(
      "There are no pages containing this tag"
    );
    fragment.appendChild(emptyMessage);

    contentEl.appendChild(fragment);
  }
}
