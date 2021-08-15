export function createAnchor(
  text: string,
  target: string,
  internal: boolean
): HTMLAnchorElement {
  let a = document.createElement("a");
  a.dataset.href = target;
  a.href = target;
  a.text = text;
  a.target = "_blank";
  a.rel = "noopener";
  if (internal) a.addClass("internal-link");

  return a;
}
