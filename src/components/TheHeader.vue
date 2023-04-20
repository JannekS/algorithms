<template>
  <header
    class="h-14 w-full sticky top-0 left-0 z-50 flex flex-row items-center transition-all duration-500"
    :class="headerStyle"
  >
    <img src="/icons/code-solid.svg" alt="show code" id="logo" class="w-8 h-8 mx-6 invert" />
    <h1 class="text-xl text-white tracking-wider font-bold">Algorithms</h1>
  </header>
</template>

<script>
export default {
  name: 'TheHeader',
  props: ['headerStyle'],
  data() {
    return {
      headerDesign: 'header-full',
    };
  },
};
</script>

<style scoped>
.invert {
  filter: invert(100%);
}

.header-full {
  @apply bg-cyan-700 text-white shadow-xl;
}

.header-transparent {
  @apply bg-gradient-to-b from-cyan-700 to-cyan-300 opacity-90 shadow-md shadow-cyan-900;
}
</style>
