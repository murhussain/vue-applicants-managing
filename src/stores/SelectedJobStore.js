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
    selectJob(id) {
      // Update the loading state
      this.loading = true;
      this.error = null;

      // Make the HTTP request to fetch the job
      fetch(`http://localhost:3000/jobs/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((job) => {
          this.job = job;
        })
        .catch((error) => {
          this.error = error;
        })
        .finally(() => {
          // Update the loading state
          this.loading = false;
        });
    },
  },
});
