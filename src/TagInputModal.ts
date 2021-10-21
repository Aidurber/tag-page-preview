import { App, Modal } from "obsidian";
import { Tag } from "./Tag";
import { TagDetailsModal } from "./TagDetailsModal";
import { getAllVaultTags } from "./utils/find-tags";

export class TagInputModal extends Modal {
  private tags: Set<string>;
  private inputValue: string | undefined;
  private hasNoMatch: boolean = false;
  constructor(app: App) {
    super(app);
    this.tags = new Set<string>();
  }

  onOpen() {
    this.renderContent();
    this.tags = getAllVaultTags(this.app);
  }

  onClose() {
    this.contentEl.empty();
    this.tags.clear();
    this.inputValue = undefined;
    this.hasNoMatch = false;
  }
  private renderContent() {
    const fragment = document.createDocumentFragment();
    const header = fragment.createEl("h2", { text: "Search tag" });
    header.style.marginTop = "0px";
    const form = fragment.createEl("form");

    const input = form.createEl("input", {
      attr: {
        id: "tag-search",
        name: "tag-search",
        type: "text",
        placeholder: "Search...",
      },
      value: this.inputValue,
    });

    const button = form.createEl("button", {
      attr: { type: "submit" },
      text: "Search",
    });
    button.style.marginLeft = "5px";
    form.onsubmit = (e) => {
      e.preventDefault();
      this.handleSubmit(e.target as HTMLFormElement);
    };
    if (this.hasNoMatch) {
      fragment.createEl("p", {
        text: `#${this.inputValue.replace(
          "#",
          ""
        )} did not match any tags in your vault`,
      });
    }
    this.contentEl.appendChild(fragment);
    input.focus();
  }

  private handleSubmit(element: HTMLFormElement) {
    const formData = new FormData(element);
    const value = formData.get("tag-search").toString().trim();
    if (!value.length) return;
    this.inputValue = value;
    const tag = Tag.create(value);
    const found = this.tags.has(tag.tag);
    if (found) {
      this.hasNoMatch = false;
      new TagDetailsModal(this.app, tag).open();
      this.close();
    } else {
      this.contentEl.empty();
      this.hasNoMatch = true;
      this.renderContent();
    }
  }
}
