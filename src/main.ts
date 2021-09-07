import { Plugin } from "obsidian";
import { Tag } from "./Tag";
import { TagDetailsModal } from "./TagDetailsModal";

export default class TagPagePreview extends Plugin {
  async onload() {
    this.registerDomEvent(document, "click", (evt: MouseEvent) => {
      this.handleClick(evt.target as HTMLElement);
    });
  }

  private handleClick(target: HTMLElement) {
    if (!Tag.isTagNode(target)) return;
    const viewState = this.app.workspace.activeLeaf.getViewState();
    let tag: Tag | null = null;
    const mode = viewState.state?.mode;
    // We can have partial tags in source mode
    if (mode === "source") {
      tag = Tag.buildTagFromPartial(target);
    } else {
      // In preview here, we're dealing with anchors
      tag = Tag.create(target);
    }

    if (!tag) {
      console.error("Tag is empty", { viewState, target });
      return;
    }

    new TagDetailsModal(this.app, tag).open();
  }
}
