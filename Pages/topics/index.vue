<script setup>
const topics = await queryContent('/').only('topics').find()
</script>

<template>
  <div>
    <div class="page-bg">
      <div class="container">
        <h3>LES SUJETS {{topics.length}} </h3>
      </div>
    </div>
  </div>
</template>
