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
   * Get all sub tags for a given tag
   */
  get subTags(): Tag[] {
    return this._text.split("/").reduce((acc, curr, index) => {
      const previous = index > 0 ? acc[index - 1] : null;
      const tagContent = previous ? `${previous.raw}/${curr}` : curr;
      return [...acc, Tag.create(tagContent)];
    }, [] as Tag[]);
  }

  /**
   * Determine whether or not this tag has sub tags
   */
  get hasSubTags(): boolean {
    // The original list will contain itself, check if it has subtags other than itself
    return this.subTags.filter((t) => !t.equals(this)).length > 0;
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
   * Build a complete tag from a partial tag
   * @param target - Click target
   * @returns
   */
  static buildTagFromPartial(target: HTMLElement): Tag | null {
    const tagClass = Array.from(target.classList).find((cls) =>
      cls.startsWith("cm-tag")
    );
    if (!tagClass) return null;
    const allParts = target.parentNode.querySelectorAll(`.${tagClass}`);
    if (!allParts.length) return null;

    return new Tag(
      Array.from(allParts)
        .map((el) => el.textContent)
        .join("")
        .replace("#", "")
    );
  }
  /**
   * Generate a Tag from an element
   * @param element - Clicked element
   * @returns
   */
  static create(element: HTMLElement | Tag | string): Tag {
    if (element instanceof Tag) return element;
    const content: string =
      typeof element === "string" ? element : element.textContent;
    return new Tag(content.replace("#", ""));
  }

  /**
   * Check if two tags are equal
   * @param other - Other tag to compare to this
   * @returns
   */
  equals = (other: Tag): boolean => {
    return this.tag === other.tag;
  };

  /**
   * Check if two tags are equal
   *
   * @param left - Left tag to compare
   * @param right - Right tag to compare
   * @returns
   */
  static equals(left: Tag, right: Tag) {
    return left.equals(right);
  }
}
