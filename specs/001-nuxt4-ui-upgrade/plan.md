# Implementation Plan: Nuxt 4 Migration & UI Smoothness Enhancement

**Branch**: `001-nuxt4-ui-upgrade` | **Date**: 2025-01-27 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/001-nuxt4-ui-upgrade/spec.md`

## Summary

Upgrade Dev-Life portfolio from Nuxt 3 to Nuxt 4 with zero breaking changes, then enhance UI smoothness through page transition animations (fade/slide <300ms), dark mode toggle transitions (200-300ms), image fade-in effects, and mobile touch feedback. Framework migration is prerequisite for all UI improvements. All existing content continues to display identically. Final outcome: professional, modern feel with 60 fps animations, Lighthouse ≥90, Core Web Vitals compliance (LCP <2.5s, CLS <0.1).

## Technical Context

**Language/Version**: TypeScript 5.x, Node 20+, Vue 3 Composition API  
**Primary Dependencies**: Nuxt 4 (latest), Tailwind CSS v4, NuxtContent 3.x, @nuxtjs/color-mode, @nuxt/image, @vesp/nuxt-fontawesome  
**Storage**: N/A (content via NuxtContent from markdown files, theme preference via localStorage)  
**Testing**: Vitest (unit), Playwright (e2e), Chrome DevTools (performance), Lighthouse (SEO/performance metrics)  
**Target Platform**: Web browsers, modern ES2020+, Node 20+ server-side rendering  
**Project Type**: Full-stack web application (Nuxt 4 SSR + static generation)  
**Performance Goals**: Page transitions <300ms, animations 60 fps constant, LCP <2.5s, CLS <0.1, Lighthouse ≥90 desktop  
**Constraints**: Zero breaking changes to existing content/pages, graceful degradation for users with `prefers-reduced-motion`, work within existing component architecture (shared/, content/, project/)  
**Scale/Scope**: 1 framework upgrade + 5 UI improvement features, ~50 existing blog posts/pages remain unchanged, ~8-12 component enhancements

## Constitution Check

**GATE: Pass (no violations)**

✅ **Principle I: Content-First Architecture** — Feature preserves all existing content without modification. Animation enhancements support (not interfere with) content discoverability. Dark mode transitions maintain readability.

✅ **Principle II: Performance & Accessibility (NON-NEGOTIABLE)** — Feature directly enforces Core Web Vitals targets. Page transitions designed for <300ms (supporting LCP requirement). Dark mode continues via @nuxtjs/color-mode. All animations respect reduced-motion preference.

✅ **Principle III: Type Safety Throughout** — TypeScript upgrade to Nuxt 4 enforces type safety. Animation timing/config will use typed interfaces. No `any` types permitted.

✅ **Principle IV: Component Modularity & Reusability** — Animations implemented within existing component structure (shared/, content/, project/). No prop drilling required. Transitions use Vue built-in `<Transition>` components.

**Technology Stack Alignment**: ✅ Uses Nuxt 4 (core framework), Tailwind CSS v4 (animations), existing @nuxtjs/color-mode (dark mode), @nuxt/image (image optimization). No new external dependencies.

## Project Structure

### Documentation (this feature)

```text
specs/001-nuxt4-ui-upgrade/
├── spec.md                           # Feature specification ✅
├── plan.md                           # This file
├── research.md                       # Phase 0 research (TBD)
├── data-model.md                     # Phase 1 data models (TBD)
├── quickstart.md                     # Phase 1 implementation quickstart (TBD)
├── contracts/                        # Phase 1 API contracts (TBD)
├── tasks.md                          # Phase 2 task list (TBD)
└── checklists/
    └── requirements.md               # Spec validation checklist ✅
```

### Source Code (repository root)

```text
# Web application structure (existing)
components/
  shared/                             # Update: Header (dark mode toggle animation)
    Header.vue
    BottomNav.vue
  content/                            # Update: Image fade-in animation
    PostImage.vue
    ExternalLink.vue
  project/                            # Existing, no changes required
    Project.vue

pages/
  index.vue                           # Update: page transition animation
  blog/
    [...slug].vue                     # Update: page transition animation
  projects.vue                        # Update: page transition animation
  topics/
    [...slug].vue                     # Update: page transition animation

app.vue                               # Update: Root layout transition wrapper
layouts/                              # Existing layouts (no changes)

# New or updated files for animations
composables/
  usePageTransition.ts               # New: page transition composable
  useThemeTransition.ts              # New: dark mode transition composable

utils/
  animation-config.ts                 # New: animation timing constants

nuxt.config.ts                        # Update: Nuxt 4 config, build targets
package.json                          # Update: Nuxt 4 dependencies
tsconfig.json                         # Update: TypeScript 5.x config
tailwind.config.ts                    # Update: Tailwind v4 config, animation utilities
```

**Structure Decision**: Web application structure—single Nuxt 4 application with existing component organization. Framework upgrade requires:
1. Dependency updates (Nuxt 3→4, dependencies, build config)
2. TypeScript config updates (5.x)
3. Tailwind v4 migration
4. Component animation enhancements in-place (no restructuring)

New files focus on animation utilities and composables rather than restructuring existing code.

## Key Design Decisions

### 1. **Nuxt 4 Upgrade Strategy (US1 - P1)**
   - **Approach**: Incremental upgrade following Nuxt docs with regression testing
   - **Order**: 1) Update nuxt, 2) Update dependencies, 3) Run typecheck, 4) Test pages, 5) Production build
   - **Risk Mitigation**: Test each existing page after upgrade; maintain git history to revert if needed
   - **Validation**: `pnpm dev` succeeds, all pages load, `pnpm build` succeeds, `nuxi typecheck` passes

### 2. **Page Transition Implementation (US2 - P1)**
   - **Approach**: Use Nuxt `<NuxtPage>` with Vue `<Transition>` wrapper + Tailwind CSS animations
   - **Timing**: 300ms duration (fade in 200ms, fade out 100ms for quick feel)
   - **Easing**: `ease-in-out` cubic bezier for smooth natural feel
   - **Reduced Motion**: Instant transitions if user has `prefers-reduced-motion` enabled
   - **No Layout Shift**: Transition CSS uses opacity/transform only (GPU-accelerated, no layout reflow)

### 3. **Dark Mode Toggle Animation (US3 - P1)**
   - **Approach**: CSS transitions on color variables + button rotation animation
   - **Timing**: 200-300ms for color transitions, 150ms for button rotation
   - **Button Feedback**: Small 90° rotation or scale animation to indicate action
   - **No Flash**: Pre-render theme on mount to prevent FOUC (Flash of Unstyled Content)
   - **Persistence**: Continue using localStorage via @nuxtjs/color-mode

### 4. **Image Fade-in (US4 - P2)**
   - **Approach**: Use @nuxt/image component with blur placeholder + CSS fade-in
   - **Timing**: 300ms fade-in as image loads
   - **Lazy Loading**: Images load on scroll via Nuxt Image native lazy loading
   - **No Layout Shift**: Image dimensions defined in markdown frontmatter to reserve space

### 5. **Mobile Touch Feedback (US5 - P2)**
   - **Approach**: Tailwind active/focus states + subtle scale/opacity changes on touch
   - **Timing**: 100-150ms feedback response
   - **No Jank**: Use `transform` and `opacity` only (GPU-accelerated)
   - **Tested on**: iPhone 14, Galaxy S20 emulation in DevTools

## Phase 0: Research (TBD)

**Unknowns to resolve**:
- Nuxt 4 breaking changes specific to this codebase (custom plugins, modules, server middleware)
- @nuxtjs/color-mode compatibility with Nuxt 4 (latest version required)
- Tailwind CSS v4 animation utility syntax changes from v3
- NuxtContent v3 compatibility verification
- Performance impact of page transitions on mobile networks

**Research tasks** (to be generated via subagent):
1. Identify all Nuxt 3→4 breaking changes affecting this specific project
2. Review @nuxtjs/color-mode Nuxt 4 compatibility and latest best practices
3. Document Tailwind v4 animation syntax and available transition utilities
4. Verify NuxtContent 3.x works seamlessly with Nuxt 4
5. Research browser support for CSS transitions and animation performance (CLS, jank prevention)

**Output**: research.md with findings and specific migration steps.

## Phase 1: Design & Contracts

**Deliverables**:
1. **data-model.md**: Animation configuration models (duration, easing, trigger points)
2. **contracts/** (if applicable): Animation API contracts (composable function signatures)
3. **quickstart.md**: Implementation quickstart with code examples for each animation type
4. **Agent context update**: Run update-agent-context.sh to embed Nuxt 4 + animation patterns

**Key Design Artifacts**:

### Animation Configuration (data-model.md)
```typescript
// Page transitions
PageTransitionConfig = {
  duration: 300,
  enterEasing: 'ease-in-out',
  exitEasing: 'ease-in-out',
  respectReducedMotion: true
}

// Dark mode transitions
ThemeTransitionConfig = {
  colorDuration: 250,
  buttonDuration: 150,
  respectReducedMotion: true
}

// Image fade-in
ImageTransitionConfig = {
  duration: 300,
  easing: 'ease-out',
  triggerPoint: 'on-load'
}
```

### Composable Contracts (contracts/)
- `usePageTransition()` — Provides transition state for page navigation
- `useThemeTransition()` — Manages dark mode toggle animation
- `useImageFadeIn()` — Handles lazy image fade-in effect

## Phase 2: Implementation Tasks (TBD)

**Output**: tasks.md with breakdown by user story

Tasks will be organized as:
- **Phase 1: Setup** — Update Nuxt to v4, TypeScript, Tailwind, dependencies
- **Phase 2: Foundation** — TypeScript migration complete, build passes, no errors
- **Phase 3: US1 (Framework Upgrade)** — All pages work, tests pass
- **Phase 3: US2 (Page Transitions)** — Transition animations implemented, performance verified
- **Phase 3: US3 (Dark Mode Toggle)** — Theme transitions smooth, no flash
- **Phase 3: US4 (Image Fade-in)** — Images fade in on load, no layout shift
- **Phase 3: US5 (Mobile)** — Mobile animations tested, touch feedback working

## Risks & Mitigation

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Nuxt 4 breaking changes in custom code | High | Phase 0 research identifies all breaking changes; systematic testing after each change |
| Dependency incompatibility (color-mode, etc.) | Medium | Verify latest versions; test in dev before production |
| Animation janking on slow devices | Medium | Use GPU-accelerated properties (transform, opacity) only; test on low-end hardware |
| Reduced motion preference missed | Medium | Test with DevTools `prefers-reduced-motion` toggle; automated test coverage |
| Layout shift during transitions | Low | Use opacity/transform CSS only; no DOM reflow; verify CLS metric <0.1 |

## Complexity Tracking

> **No Constitution violations—no complexity justification needed**

All work aligns with all four core principles. No alternative approaches required.

## Next Steps

1. ✅ **Spec**: Complete and validated
2. ⏳ **Phase 0 Research**: Run research agent to resolve unknowns
3. ⏳ **Phase 1 Design**: Generate data-model.md, contracts/, quickstart.md
4. ⏳ **Agent Context**: Update copilot context with Nuxt 4 + animation patterns
5. ⏳ **Phase 2 Tasks**: Generate tasks.md for implementation and parallel development
