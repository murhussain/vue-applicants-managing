import { defineStore } from 'pinia';

export const useJobStore = defineStore('job', {
  state: () => ({
    jobs: []
  }),

  actions: {
    async fetchAndSetJobs() {
      const response = await fetch('http://localhost:3000/jobs');
      const jobs = await response.json();
      this.jobs = jobs;
    },

    updateJob(id, { name, code, initSalary, maxSalary }) {
      const job = this.jobs.find((j) => j.id === id);
      job.name = name;
      job.code = code;
      job.initSalary = initSalary;
      job.maxSalary = maxSalary;
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
