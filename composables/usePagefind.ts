import { ref, type Ref } from "vue";
import { z } from "zod";

export const PagefindResultSchema = z.object({
  id: z.string(),
  url: z.string(),
  meta: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.string().optional(),
  }),
  excerpt: z.string(),
  word_count: z.number().optional(),
});

export type SearchResult = z.infer<typeof PagefindResultSchema>;

export interface SearchResponse {
  results: SearchResult[];
  total: number;
}

interface PagefindRuntime {
  search(query: string): Promise<{
    results: Array<{ id: string; data: () => Promise<unknown> }>;
  }>;
  options?: (opts: Record<string, unknown>) => Promise<void>;
}

let runtimePromise: Promise<PagefindRuntime | null> | null = null;

async function loadRuntime(): Promise<PagefindRuntime | null> {
  if (!runtimePromise) {
    runtimePromise = (async () => {
      try {
        // Pagefind ships its runtime as a static asset emitted by the
        // build hook in nuxt.config.ts. Vite + TS must not try to
        // resolve this at build time — it only exists in
        // .output/public/pagefind/ at runtime. Indirect string defeats
        // both Vite's analyzer and TS's module-resolution check.
        const url = "/pagefind/pagefind.js";
        const mod = (await import(/* @vite-ignore */ url)) as PagefindRuntime;
        if (typeof mod.options === "function") {
          await mod.options({ excerptLength: 30 });
        }
        return mod;
      } catch (err) {
        // Dev mode or blocked assets — no /pagefind/ on disk.
        // Surface as disabled state, not as a thrown error.
        if (import.meta.dev) {
          // eslint-disable-next-line no-console
          console.info(
            "[usePagefind] search disabled in dev (run `pnpm build && pnpm preview` to test)."
          );
        } else {
          // eslint-disable-next-line no-console
          console.warn("[usePagefind] failed to load Pagefind runtime:", err);
        }
        return null;
      }
    })();
  }
  return runtimePromise;
}

export interface UsePagefind {
  search(
    query: string,
    opts: { limit: number; offset: number }
  ): Promise<SearchResponse>;
  disabled: Ref<boolean>;
}

export function usePagefind(): UsePagefind {
  const disabled = ref(false);

  async function search(
    query: string,
    opts: { limit: number; offset: number }
  ): Promise<SearchResponse> {
    const trimmed = query.trim();
    if (!trimmed) return { results: [], total: 0 };

    const runtime = await loadRuntime();
    if (!runtime) {
      disabled.value = true;
      return { results: [], total: 0 };
    }

    let response: Awaited<ReturnType<PagefindRuntime["search"]>>;
    try {
      response = await runtime.search(trimmed);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn("[usePagefind] search threw:", err);
      return { results: [], total: 0 };
    }

    const total = response.results.length;
    const window = response.results.slice(
      opts.offset,
      opts.offset + opts.limit
    );

    const results: SearchResult[] = [];
    for (const r of window) {
      try {
        const data = await r.data();
        const parsed = PagefindResultSchema.safeParse({
          id: r.id,
          ...(typeof data === "object" && data !== null ? data : {}),
        });
        if (parsed.success) {
          results.push(parsed.data);
        } else {
          // eslint-disable-next-line no-console
          console.warn(
            "[usePagefind] dropping malformed result:",
            parsed.error.issues
          );
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn("[usePagefind] result.data() threw:", err);
      }
    }

    return { results, total };
  }

  return { search, disabled };
}
