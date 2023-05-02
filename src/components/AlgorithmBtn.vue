<template>
  <button
    @click="btnClicked"
    class="m-2 p-4 w-52 max-w-sm rounded-lg bg-slate-600 text-white font-mono text-center text-lg hover:bg-cyan-600 hover:font-bold duration-300"
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
  emits: ['btnClicked'],
  methods: {
    btnClicked() {
      this.$emit('btnClicked', this.algorithm);
    },
  },
};
</script>

<style scoped></style>
