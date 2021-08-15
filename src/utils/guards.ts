/**
 * Determine whether an element is an anchor tag
 * @param element - Clicked element
 * @returns
 */
export function isAnchorTag(
  element: HTMLElement
): element is HTMLAnchorElement {
  return !!element.getAttribute("href");
}
