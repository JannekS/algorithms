<template>
  <div>
    <the-header />

    <main>
      <router-view />
    </main>

    <footer>
      <h3>The footer will be right here...</h3>
    </footer>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue';
export default {
  name: 'App',
  components: {
    TheHeader,
  },
};
</script>

<style scoped></style>
