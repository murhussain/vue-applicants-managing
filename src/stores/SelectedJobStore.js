import { defineStore } from 'pinia';

export const useSelectedJobStore = defineStore({
  id: 'selectedJob',

  state: () => ({
    job: null,
    loading: false,
    error: null,
  }),

  getters: {
    selectedJob() {
      return this.job;
    },
  },

  actions: {
    async selectJob(id) {
      // Update the loading state
    this.loading = true;
    this.error = null;

    // Make the HTTP request to fetch the job
    const response = await fetch(`http://localhost:3000/jobs/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const job = await response.json();
    this.job = job;

    // Update the loading state
    this.loading = false;
  },
    },
  },
);