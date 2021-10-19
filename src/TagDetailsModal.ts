import { App, Modal, TFile } from "obsidian";
import { Tag } from "./Tag";
import { getAllFilesMatchingTag } from "./utils/find-tags";
import { createTextContent, createLink } from "./utils/render";

function sortFiles(a: TFile, b: TFile): number {
  if (a.name > b.name) return 1;
  if (a.name < b.name) return -1;
  return 0;
}

export class TagDetailsModal extends Modal {
  private originalTag: Tag;
  constructor(app: App, private tag: Tag) {
    super(app);
    this.originalTag = tag;
  }

  onOpen() {
    this.renderContent();
  }

  onClose() {
    this.contentEl.empty();
  }

  onSelectTag = (tag: string) => {
    this.tag = Tag.create(tag);
    this.contentEl.empty();
    this.renderContent();
  };

  private renderContent() {
    const tag = this.tag;
    const pages = getAllFilesMatchingTag(this.app, tag);
    const fragment = document.createDocumentFragment();
    fragment.appendChild(createTextContent("h2", `Pages with ${tag.tag}`));

    if (this.originalTag.hasSubTags) {
      this.renderSubTagScope(fragment);
    }
    if (pages.size === 0) {
      this.renderEmptyContent(fragment);
    } else {
      this.renderLinks(fragment, pages);
    }

    this.contentEl.appendChild(fragment);
  }

  private renderSubTagScope = (fragment: DocumentFragment) => {
    const subTags = this.originalTag.subTags.filter(
      (st) => !st.equals(this.tag)
    );
    const select = fragment.createEl("select", { cls: "dropdown" });
    select.style.marginBottom = "1em";
    select.value = this.tag.tag;
    select.onchange = (e) => {
      this.onSelectTag((e.target as HTMLSelectElement).value);
    };
    select.createEl("option", { value: "", text: "Change tag scope" });
    subTags.forEach((subTag) => {
      select.createEl("option", { value: subTag.tag, text: subTag.tag });
    });
  };

  /**
   * Render the links portion of the DOM
   * @param fragment - Document fragment to add content to
   * @param pages - Pages containing the selected tag
   */
  private renderLinks(fragment: DocumentFragment, pages: Set<TFile>) {
    const list = document.createElement("ol");
    const sortedPages = Array.from(pages).sort(sortFiles);
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
