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
}
