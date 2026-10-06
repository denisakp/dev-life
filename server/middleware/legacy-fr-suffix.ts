// Until components/Post.vue was fixed, every card on a French listing linked to
// the CONTENT path instead of the route: /blog/ai/foo.fr rather than
// /fr/blog/ai/foo. Those URLs were shared publicly, so redirect them for good.
export default defineEventHandler((event) => {
  const [pathname = "", search] = (event.path ?? "").split("?");
  if (!pathname.startsWith("/blog/") || !pathname.endsWith(".fr")) return;

  const target = `/fr${pathname.slice(0, -".fr".length)}`;
  return sendRedirect(event, search ? `${target}?${search}` : target, 301);
});
