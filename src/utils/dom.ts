function buildSiblingGetter(type: "next" | "previous") {
  const accessor =
    type === "next" ? "nextElementSibling" : "previousElementSibling";
  return function (elem: HTMLElement, selector: string) {
    // Get the next sibling element
    let sibling = elem[accessor];
    let result = [sibling];
    // If the sibling matches our selector, use it
    // If not, jump to the next sibling and continue the loop
    while (sibling) {
      if (sibling.matches(selector)) return result;
      sibling = sibling[accessor];
      result.push(sibling);
    }
  };
}
export const getNextSiblings = buildSiblingGetter("next");
export const getPreviousSiblings = buildSiblingGetter("previous");
