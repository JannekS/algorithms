<template>
  <div>
    <the-header :headerStyle="headerStyle" />

    <main @scroll="handleScroll">
      <router-view />
    </main>

    <the-footer />
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';
export default {
  name: 'App',
  data() {
    return {
      headerStyle: 'header-full',
    };
  },
  components: {
    TheHeader,
    TheFooter,
  },

  methods: {
    handleScroll() {
      if (window.scrollY > 40) {
        this.headerStyle = 'header-transparent';
      } else {
        this.headerStyle = 'header-full';
      }
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
};
</script>

<style scoped></style>
