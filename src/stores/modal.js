import { defineStore } from 'pinia';

export default defineStore('modal', {
  state: () => ({
    modalDisplayed: false,
  }),
  getters: {
    displayModal(state) {
      return state.modalDisplayed;
    },
  },
});
