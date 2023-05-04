<template>
  <button
    @click="btnClicked"
    class="m-2 p-4 w-52 max-w-sm rounded-lg bg-gradient-to-bl from-slate-400 to-slate-500 shadow-md text-white font-mono text-center text-lg hover:from-cyan-400 hover:to-cyan-600 hover:scale-105 hover:shadow-2xl hover:font-bold active:from-cyan-600 active:to-cyan-600 active:scale-100 active:shadow-sm duration-300"
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
