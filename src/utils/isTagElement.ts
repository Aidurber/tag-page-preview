import { Tag } from "../Tag";

/**
 * Determine whether a clicked element was an Obsidian tag
 * @param target - Click target
 * @returns
 */
export function isTagElement(target: HTMLElement): boolean {
  return (
    target.classList.contains("tag") || target.classList.contains("cm-hashtag")
  );
}

/**
 * Determine whether an element is an anchor tag
 * @param element - Clicked element
 * @returns
 */
function isAnchorTag(element: HTMLElement): element is HTMLAnchorElement {
  return !!element.getAttribute("href");
}

/**
 * Generate a Tag from an element
 * @param element - Clicked element
 * @returns
 */
export function getTagContent(element: HTMLElement): Tag {
  const content = isAnchorTag(element)
    ? element.textContent.replace("#", "")
    : element.textContent;
  return new Tag(content);
}
