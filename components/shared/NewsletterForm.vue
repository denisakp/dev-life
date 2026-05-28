<script setup lang="ts">
const props = withDefaults(
  defineProps<{ placement?: "blog" | "about" }>(),
  { placement: "blog" }
);

const config = useRuntimeConfig();
const username = (config.public.buttondownUsername as string) ?? "";
const actionUrl = computed(
  () => `https://buttondown.com/api/emails/embed-subscribe/${username}`
);

const fieldId = `newsletter-email-${props.placement}`;

const email = ref("");
const state = ref<"idle" | "submitting" | "success" | "error">("idle");
const errorMessage = ref("");

const heading =
  props.placement === "about" ? "Stay in touch" : "Subscribe to future posts";
const helper =
  props.placement === "about"
    ? "A short email when something new ships. No spam."
    : "Get future posts in your inbox. No spam, unsubscribe any time.";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function onSubmit(event: Event) {
  event.preventDefault();
  if (!username) return;

  const value = email.value.trim();
  if (!emailRegex.test(value)) {
    state.value = "error";
    errorMessage.value = "Please enter a valid email address.";
    return;
  }

  state.value = "submitting";
  errorMessage.value = "";

  try {
    const body = new FormData();
    body.set("email", value);
    body.set("embed", "1");
    await fetch(actionUrl.value, {
      method: "POST",
      mode: "no-cors",
      body,
    });
    state.value = "success";
  } catch {
    state.value = "error";
    errorMessage.value = "Something went wrong — please try again.";
  }
}
</script>

<template>
  <section
    class="my-12 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-6"
    aria-labelledby="newsletter-heading"
  >
    <h2
      id="newsletter-heading"
      class="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-1"
    >
      {{ heading }}
    </h2>
    <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
      {{ helper }}
    </p>

    <template v-if="!username">
      <p class="text-sm text-neutral-500 italic">
        Newsletter signup coming soon.
      </p>
    </template>

    <template v-else-if="state === 'success'">
      <p
        class="text-sm text-primary-600 dark:text-primary-400 font-medium"
        role="status"
      >
        Thanks — check your inbox to confirm your subscription.
      </p>
      <p class="mt-3 text-xs text-neutral-400">
        <a
          :href="`https://buttondown.com/refer/${username}`"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:underline"
        >Powered by Buttondown.</a>
      </p>
    </template>

    <template v-else>
      <form
        :action="actionUrl"
        method="post"
        class="flex flex-col sm:flex-row gap-2"
        @submit="onSubmit"
      >
        <label :for="fieldId" class="sr-only">Email address</label>
        <input
          :id="fieldId"
          v-model="email"
          type="email"
          name="email"
          autocomplete="email"
          required
          placeholder="you@example.com"
          :aria-describedby="`${fieldId}-error`"
          class="flex-1 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <input type="hidden" name="embed" value="1" />
        <button
          type="submit"
          :disabled="state === 'submitting'"
          class="rounded-md bg-primary-600 hover:bg-primary-700 disabled:opacity-60 text-white text-sm font-medium px-4 py-2 transition-colors"
        >
          {{ state === "submitting" ? "Subscribing…" : "Subscribe" }}
        </button>
      </form>
      <p
        :id="`${fieldId}-error`"
        role="alert"
        aria-live="polite"
        class="mt-2 text-sm text-red-600 dark:text-red-400 min-h-5"
      >
        {{ state === "error" ? errorMessage : "" }}
      </p>
      <p class="mt-3 text-xs text-neutral-400">
        <a
          :href="`https://buttondown.com/refer/${username}`"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:underline"
        >Powered by Buttondown.</a>
      </p>
    </template>
  </section>
</template>
