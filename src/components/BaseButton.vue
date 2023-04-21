<template>
  <button
    class="flex flex-row text-xs text-black justify-center items-center p-2 space-x-2 font-mono rounded-lg bg-lime-600 m-2 hover:bg-lime-500"
    @click="onClick"
  >
    <slot>
      <div v-if="imgUrl">
        <img :src="imgUrl" class="w-4 h-4" />
      </div>
      <span id="code-btn-label" class="flex">{{ value }}</span>
    </slot>
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    value: {
      type: String,
      default: 'Click here',
    },
    imgUrl: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: 'button',
    },
  },
  emits: ['btnClicked'],
  methods: {
    onClick(event) {
      this.$emit('btnClicked', event.target.name);
    },
  },
};
</script>

<style scoped></style>
