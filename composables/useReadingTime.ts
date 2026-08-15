/**
 * Walk a Nuxt Content v3 body AST and count prose words.
 *
 * The body uses MDC minimark serialization where nodes appear in two shapes:
 *   - Object: { tag, value?, children? }
 *   - Tuple:  [tagName, props, ...children]
 *
 * We skip `code` and `pre` nodes, those are scanning, not reading.
 */
function countWords(node: unknown, depth = 0): number {
  if (depth > 200) return 0; // recursion guard
  if (node == null) return 0;

  if (typeof node === "string") {
    return node.trim().split(/\s+/).filter(Boolean).length;
  }

  if (typeof node !== "object") return 0;

  if (Array.isArray(node)) {
    // Tuple form: [tag, props, ...children]
    const first = node[0];
    if (
      typeof first === "string" &&
      first.length > 0 &&
      first.length < 20 &&
      /^[a-z0-9]+$/i.test(first)
    ) {
      if (first === "code" || first === "pre") return 0;
      // skip tag (idx 0) + props (idx 1), recurse into children
      return node
        .slice(2)
        .reduce<number>((s, c) => s + countWords(c, depth + 1), 0);
    }
    // Plain array of children
    return node.reduce<number>((s, c) => s + countWords(c, depth + 1), 0);
  }

  // Object form
  const n = node as { tag?: string; value?: unknown; children?: unknown[] };
  if (n.tag === "code" || n.tag === "pre") return 0;
  let sum = 0;
  if (n.value !== undefined) sum += countWords(n.value, depth + 1);
  if (n.children !== undefined) sum += countWords(n.children, depth + 1);
  return sum;
}

export function useReadingTime(body: unknown) {
  const words = countWords(body);
  const minutes = Math.max(1, Math.ceil(words / 200));
  return { words, minutes, label: `${minutes} min read` };
}
