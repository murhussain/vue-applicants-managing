import { defineStore } from 'pinia';

export const useJobStore = defineStore('job', {
  state: () => ({
    jobs: []
  }),

  actions: {
    async fetchJobs() {
      const response = await fetch('http://localhost:3000/jobs');
      const jobs = await response.json();
      return jobs;
    },

    updateJobs(jobs) {
      this.jobs = jobs;
    },

    async createJob(newJob) {
      const response = await fetch("http://localhost:3000/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newJob),
      });
      const createdJob = await response.json();
      this.jobs.push(createdJob);
    },

    async deleteJob(id) {
      await fetch(`http://localhost:3000/jobs/${id}`, {
        method: "DELETE",
      });
      this.jobs = this.jobs.filter((job) => job.id !== id);
    }

  },

  getters: {
    getJobById: (state) => (id) => {
      return state.jobs.find((job) => job.id === id);
    }
  }
});
