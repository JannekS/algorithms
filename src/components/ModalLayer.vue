<template>
  <div>
    <Transition name="bg-layer">
      <div v-show="modalOpen">
        <div
          class="fixed top-0 bottom-0 left-0 right-0 h-screen w-full z-50 bg-slate-700 bg-opacity-50"
        >
          <Transition name="open-up">
            <div
              v-show="modalOpen"
              class="flex flex-col justify-center items-center h-screen w-full"
            >
              <slot></slot>
            </div>
          </Transition>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
export default {
  name: 'ModalLayer',
  props: {
    modalOpen: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.bg-layer-leave-active {
  transition: 0.5s;
}

.open-up-enter-active {
  animation: open-up 0.5s;
}
.open-up-leave-active {
  animation: open-up 0.5s reverse;
}
@keyframes open-up {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}
</style>
