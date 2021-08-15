export class Tag {
  private _text: string;
  // TODO if is anchor tag strip leading #
  constructor(tag: string) {
    this._text = tag;
  }

  get raw() {
    return this._text;
  }

  get tag() {
    return `#${this._text}`;
  }
}
