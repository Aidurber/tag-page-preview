export class Tag {
  private _text: string;
  constructor(tag: string) {
    this._text = tag;
  }

  /**
   * Get the raw value of the tag
   */
  get raw() {
    return this._text;
  }

  /**
   * Get the tag including "#"
   */
  get tag() {
    return `#${this._text}`;
  }
  /**
   * Determine whether a clicked element was an Obsidian tag
   * @param target - Click target
   * @returns
   */
  static isTagNode(target: HTMLElement | Tag): boolean {
    if (target instanceof Tag) return true;
    return (
      target.classList.contains("tag") ||
      target.classList.contains("cm-hashtag")
    );
  }
  /**
   * Generate a Tag from an element
   * @param element - Clicked element
   * @returns
   */
  static create(element: HTMLElement | Tag): Tag {
    if (element instanceof Tag) return element;
    const content = element.textContent.replace("#", "");
    return new Tag(content);
  }
}
