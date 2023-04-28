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
      this.loading = true;
      this.error = null;
    
      try {
        const response = await axiosInstance.get(`http://localhost:3000/jobs/${id}`);
        const job = response.data;
        this.job = job;
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.error = 'Failed to fetch job';
        // Retry logic failed, display error message to user
        this.$root.$emit('show-error', 'Failed to fetch jobs');
        throw new Error('Failed to fetch job');
      }
    }
  },
});