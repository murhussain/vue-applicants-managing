import { defineStore } from 'pinia'

export const useSelectedJobStore = defineStore('selectedJob', {
  state: () => ({
    id: null,
    name: null,
  }),
  actions: {
    updateSelectedJob({ id, name }) {
      this.id = id;
      this.name = name;
    },
  },
})
