import { defineStore } from 'pinia';

export default defineStore('modal', {
  state: () => ({
    isOpen: false,
  }),
  getters: {
    displayModal(state) {
      return state.isOpen ? '' : 'hidden';
    },
  },
});
