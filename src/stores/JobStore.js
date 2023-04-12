import axios from 'axios';
import { defineStore } from 'pinia';

export const useJobStore = defineStore('job', {
  state: () => ({
    jobs: [],
    job: null,
    loading: false,
    error: null
  }),

  actions: {
    // Fetching all jobs in the list of jobs
    async fetchAndSetJobs() {
      try {
        const response = await axios.get('http://localhost:3000/jobs');
        this.jobs = response.data;
        this.loading = false;
        this.error = null;
      } catch (error) {
        this.loading = false;
        this.error = 'Failed to fetch jobs';
        throw new Error('Failed to fetch jobs');
      }
    },

    // Fetching an individual job based on provided id
    async fetchAndSetJob(id) {
      try {
        const response = await axios.get(`http://localhost:3000/jobs/${id}`);
        this.job = response.data;
        this.loading = false;
        this.error = null;
      } catch (error) {
        this.loading = false;
        this.error = 'Failed to fetch job';
        throw new Error('Failed to fetch job');
      }
    },

    // Creating a new job in the list
    async createJob(newJob) { 
      this.loading = true
      try {
        const response = await fetch('http://localhost:3000/jobs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newJob)
        })
        const createdJob = await response.json()
        this.jobs.push(createdJob)
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

    async deleteJob(id) {
      this.loading = true;
      try {
        await axios.delete(`http://localhost:3000/jobs/${id}`);
        this.jobs = this.jobs.filter((job) => job.id !== id);
        this.loading = false;
        this.error = null;
      } catch (error) {
        this.loading = false;
        this.error = 'Failed to delete job';
        throw new Error('Failed to delete job');
      }
    }  , 
    
    async updateJobById(jobId, updatedJob) {
      this.loading = true;
      try {
        const response = await axios.put(`http://localhost:3000/jobs/${jobId}`, updatedJob, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const job = response.data;
        this.job = job;
    
        // Fetch all jobs to update the local store
        await this.fetchAndSetJobs();
      } catch (error) {
        this.loading = false;
        this.error = 'Failed to update job';
        throw new Error('Failed to update job');
      }
    }
  },
});
