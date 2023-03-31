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

    async updateJob(updatedJob) {
      const response = await fetch(`http://localhost:3000/jobs/${updatedJob.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedJob),
      });
      const updatedJobFromServer = await response.json();
      this.jobs = this.jobs.map(job => {
        if (job.id === updatedJobFromServer.id) {
          return updatedJobFromServer;
        } else {
          return job;
        }
      });
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

});
