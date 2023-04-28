<template>
  <button
    class="m-2 p-4 w-full max-w-sm rounded-lg bg-slate-600 text-white font-mono text-center text-lg hover:bg-cyan-600 hover:font-bold duration-300"
  >
    {{ algorithm }}
  </button>
</template>

<script>
export default {
  name: 'AlgorithmBtn',
  props: {
    algorithm: {
      type: String,
      default: '',
    },
  },
};
</script>

<style scoped></style>
