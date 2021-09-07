import { getNextSiblings, getPreviousSiblings } from "./utils/dom";

const START_SELECTOR = "cm-hashtag-begin";
const START_CLASS = `.${START_SELECTOR}`;
const END_SELECTOR = "cm-hashtag-end";
const END_CLASS = `.${END_SELECTOR}`;

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
    /**
     * In source mode the markup has all of the tag parts in separate tags
     * <span class="cm-formatting cm-formatting-hashtag cm-hashtag-begin cm-hashtag cm-meta cm-tag-test_tag">#</span>
     * <span class="cm-hashtag cm-meta">test_</span>
     * <span class="cm-hashtag cm-meta cm-hashtag-end cm-tag-tag">tag</span>
     * We need to find the full tag. We can't check the metadata cache because we want to make sure we're clicking on the right
     * element.
     */
    const prevStop = getPreviousSiblings(target, START_CLASS);
    const nextStop = getNextSiblings(target, END_CLASS);
    const classes = target.classList;
    let parts: Element[] = [];
    if (classes.contains(END_SELECTOR)) {
      parts = [...prevStop, target];
    } else if (classes.contains(START_SELECTOR)) {
      parts = [target, ...nextStop];
    } else {
      parts = [...prevStop, target, ...nextStop];
    }

    const builtTag = parts.map((part) => part.textContent).join("");
    return Tag.create(builtTag);
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
