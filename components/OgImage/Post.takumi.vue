<script setup lang="ts">
const props = defineProps<{
  title?: string;
  date?: string;
}>();
</script>

<template>
  <div style="width: 1200px; height: 630px; display: flex; flex-direction: column; justify-content: space-between; padding: 64px; background: white; font-family: Inter;">
    <div style="display: flex; align-items: center; justify-content: space-between;">
      <div style="font-size: 30px; font-weight: 700; color: #4f46e5;">&lt; Denis AKPAGNONITE /&gt;</div>
      <div style="font-size: 18px; color: #71717a;">denisakp.me</div>
    </div>
    <div style="font-size: 56px; font-weight: 700; color: #4f46e5; line-height: 1.2;">
      {{ props.title || "" }}
    </div>
    <div style="display: flex; align-items: center; justify-content: space-between; font-size: 22px; color: #525252;">
      <div>{{ props.date || "" }}</div>
      <div>Cloud Native · DevOps · SRE</div>
    </div>
  </div>
</template>
