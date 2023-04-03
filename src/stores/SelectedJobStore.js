import { defineStore } from 'pinia';

export const useSelectedJobStore = defineStore({
  id: 'selectedJob',
  state: () => ({
    id: Number,
    name: 'All Applicants',
    code: String,
    initSalary: Number,
    maxSalary: Number,
  }),
});
