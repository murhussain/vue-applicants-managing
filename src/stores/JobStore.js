import axios from 'axios';
import { defineStore } from 'pinia';
import axiosRetry from 'axios-retry';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000'
});

// Add an interceptor to handle network errors and redirect to cached data
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 404) {
      // Redirect to cached data if the server returns a 404 error
      const cachedResponse = await caches.match(error.config.url);
      if (cachedResponse) {
        return cachedResponse;
      }
    }

    // Return the error if there is no cached data
    return Promise.reject(error);
  }
);

// Add retry logic to axios instance
axiosRetry(axiosInstance, {
  retries: 3, // number of retry attempts
  retryDelay: (retryCount) => {
    return retryCount * 1000; // retry delay in milliseconds
  }
});

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
      this.loading = true;
      this.error = null;

      try {
        const response = await axiosInstance.get('http://localhost:3000/jobs');
        this.jobs = response.data;
        this.loading = false;
        this.error = null;
      } catch (error) {
        this.loading = false;
        this.error = 'Failed to fetch jobs';
        // Retry logic failed, display error message to user
        this.$root.$emit('show-error', 'Failed to fetch jobs');
        throw new Error('Failed to fetch jobs');
      }
    },

    // Fetching an individual job based on provided id
    async fetchAndSetJob(id) {
      this.loading = true;
      this.error = null;

      try {
        const response = await axiosInstance.get(`http://localhost:3000/jobs/${id}`);
        this.job = response.data;
        this.loading = false;
        this.error = null;
      } catch (error) {
        this.loading = false;
        this.error = 'Failed to fetch job';
        // Retry logic failed, display error message to user
        this.$root.$emit('show-error', 'Failed to fetch job');
        throw new Error('Failed to fetch job');
      }
    },

    // Creating a new job in the list
    async createJob(newJob) {
      this.loading = true;
      this.error = null;

      try {
        const response = await axiosInstance.post('http://localhost:3000/jobs', newJob, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const createdJob = response.data;
        this.jobs.push(createdJob);
        this.loading = false;
        this.error = null;
      } catch (error) {
        this.loading = false;
        this.error = 'Failed to create job';
        // Retry logic failed, display error message to user
        this.$root.$emit('show-error', 'Failed to fetch job');
        throw new Error('Failed to create job');
      }
    },    

    async deleteJob(id) {
      this.loading = true;
      this.error = null;

      try {
        await axiosInstance.delete(`http://localhost:3000/jobs/${id}`);
        this.jobs = this.jobs.filter((job) => job.id !== id);
        this.loading = false;
        this.error = null;
      } catch (error) {
        this.loading = false;
        this.error = 'Failed to delete job';
        // Retry logic failed, display error message to user
        this.$root.$emit('show-error', 'Failed to fetch job');
        throw new Error('Failed to delete job');
      }
    }  , 
    
    async updateJobById(jobId, updatedJob) {
      this.loading = true;
      this.error = null;

      try {
        const response = await axiosInstance.put(`http://localhost:3000/jobs/${jobId}`, updatedJob, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const job = response.data;
        this.job = job;
    
        // Fetch all jobs to update the local store
        await this.fetchAndSetJobs();
        this.loading = false;
        this.error = null;
      } catch (error) {
        this.loading = false;
        this.error = 'Failed to update job';
        // Retry logic failed, display error message to user
        this.$root.$emit('show-error', 'Failed to fetch job');
        throw new Error('Failed to update job');
      }
    }
  },
});
