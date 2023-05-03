<template>
  <div
    class="absolute rounded-lg w-full h-full bg-slate-700 [backface-visibility:hidden]"
    :class="rotated"
  >
    <div class="flex flex-col w-full h-full">
      <!-- Card Header -->
      <div class="w-full border-b border-b-slate-500 flex flex-row justify-between items-center">
        <!-- Iconic Buttons -->
        <div class="flex flex-row items-center">
          <div class="rounded-full h-3 w-3 ml-2 shrink-0 bg-red-500"></div>
          <div class="rounded-full h-3 w-3 ml-1 shrink-0 bg-yellow-400"></div>
          <div class="rounded-full h-3 w-3 ml-1 shrink-0 bg-green-500"></div>
        </div>

        <!-- Card Heading -->
        <div class="mx-4 py-2 text-slate-400">
          <h2 class="text-lg font-bold">{{ cardHeading }}</h2>
        </div>
        <!-- Close-Modal Button -->
        <button
          class="w-6 h-6 mr-2 ml-8 rounded-full text-slate-300 bg-slate-500 hover:bg-cyan-600"
          @click="$emit('closeBtnClicked')"
        >
          X
        </button>
      </div>

      <!-- Card Main Content -->
      <div class="flex-auto text-slate-200 p-2 border-b border-b-slate-500 overflow-y-auto md:px-4">
        <slot name="content"></slot>
      </div>

      <!-- Card Footer -->
      <div class="relative bottom-0 left-0 w-full flex flex-row justify-between">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CodeCardLayout',
  props: {
    cardHeading: {
      type: String,
      default: 'Code',
    },
    rotated: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped></style>
