import { defineStore } from 'pinia';

export const useSelectedJobStore = defineStore({
  id: 'selectedJob',
  state: () => ({
    name: 'default name',
    id: 0,
  }),
});
