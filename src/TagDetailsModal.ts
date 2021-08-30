import { App, Modal, TFile } from "obsidian";
import { Tag } from "./Tag";
import { getAllFilesMatchingTag } from "./utils/getAllFilesMatchingTag";
import { createTextContent, createLink } from "./utils/render";

export class TagDetailsModal extends Modal {
  constructor(app: App, private tag: Tag) {
    super(app);
  }

  onOpen() {
    this.renderContent();
  }

  onClose() {
    this.contentEl.empty();
  }

  private renderContent() {
    const pages = getAllFilesMatchingTag(this.app, this.tag);
    const fragment = document.createDocumentFragment();
    fragment.appendChild(createTextContent("h2", `Pages with ${this.tag.tag}`));

    if (pages.size === 0) {
      this.renderEmptyContent(fragment);
    } else {
      this.renderLinks(fragment, pages);
    }

    this.contentEl.appendChild(fragment);
  }

  /**
   * Render the links portion of the DOM
   * @param fragment - Document fragment to add content to
   * @param pages - Pages containing the selected tag
   */
  private renderLinks(fragment: DocumentFragment, pages: Set<TFile>) {
    const list = document.createElement("ol");
    const sortedPages = Array.from(pages).sort((a, b) => {
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      return 0;
    });
    for (let page of sortedPages) {
      const el = document.createElement("li");
      const link = createLink(this.app, page, () => this.close());
      el.appendChild(link);
      fragment.appendChild(el);
    }
    fragment.appendChild(list);
  }

  /**
   * Render the empty message to the DOM
   * @param fragment - Document fragment to add content to
   */
  private renderEmptyContent(fragment: DocumentFragment) {
    fragment.appendChild(
      createTextContent("p", "There are no pages containing this tag")
    );
  }
}
