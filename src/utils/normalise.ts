/**
 * Get the file name from a file path
 * @param path - File path
 * @returns
 */
export function getFileName(path: string): string {
  if (path.includes("/")) path = path.substring(path.lastIndexOf("/") + 1);
  if (path.endsWith(".md")) path = path.substring(0, path.length - 3);
  return path;
}
/**
 * Remove the markdown extension from a given file path
 * @param path - File path
 * @returns
 */
export function removeMarkdownExtension(path: string): string {
  return path.replace(".md", "");
}
