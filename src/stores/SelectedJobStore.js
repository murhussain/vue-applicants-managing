import { defineStore } from 'pinia';

export const useSelectedJobStore = defineStore({
  id: 'selectedJob',
  state: () => ({
    id: Number,
    name: 'E-employment',
    code: String,
    initSalary: Number,
    maxSalary: Number,
  }),
});