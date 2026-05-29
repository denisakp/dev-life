<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string;
  }>(),
  {
    title: "Denis AKPAGNONITE",
  }
);
</script>

<template>
  <div style="width: 1200px; height: 630px; display: flex; flex-direction: column; align-items: center; justify-content: center; background: white; padding: 64px; font-family: Inter;">
    <div style="font-size: 36px; font-weight: 700; color: #4f46e5; margin-bottom: 24px;">&lt; Denis AKPAGNONITE /&gt;</div>
    <div style="font-size: 48px; font-weight: 700; color: #4f46e5; line-height: 1.2; text-align: center; margin-bottom: 24px;">{{ title }}</div>
    <div style="font-size: 22px; color: #525252;">Cloud Native · DevOps · SRE</div>
  </div>
</template>
