<script setup>
  definePageMeta({
    middleware: [
        function (to, from) {
          return navigateTo('/blog/page/1')
        }
    ]
  })
</script>
