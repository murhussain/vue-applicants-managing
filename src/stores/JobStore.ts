import axios from 'axios';
import { defineStore } from 'pinia';
import axiosRetry from 'axios-retry';

interface Job {
  id: number;
  name: string;
  code: string;
  initSalary: number;
  maxSalary: number;
}

interface JobState {
  jobs: Job[];
  job: Job | null;
  loading: boolean;
  error: string | null;
}

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
  state: (): JobState  => ({
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
        const response = await axiosInstance.get('/jobs');
        this.jobs = response.data;
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.error = 'Failed to fetch jobs';
        throw new Error('Failed to fetch jobs');
      }
    },

    // Fetching an individual job based on provided id
    async fetchAndSetJob(id: number) {
      this.loading = true;
      this.error = null;

      try {
        const response = await axiosInstance.get<Job>(`/jobs/${id}`);
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
    async createJob(newJob: Job) {
      this.loading = true;
      this.error = null;

      try {
        const response = await axiosInstance.post<Job>('/jobs', newJob, {
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
        throw new Error('Failed to create job');
      }
    },

    async deleteJob(id: number) {
      this.loading = true;
      this.error = null;

      try {
        await axiosInstance.delete<Job>(`/jobs/${id}`);
        this.jobs = this.jobs.filter((job) => job.id !== id);
        this.loading = false;
        this.error = null;
      } catch (error) {
        this.loading = false;
        this.error = 'Failed to delete job';
        throw new Error('Failed to delete job');
      }
    },
    
    async updateJobById(jobId: number, updatedJob: Job) {
      this.loading = true;
      this.error = null;

      try {
        const response = await axiosInstance.put<Job>(`/jobs/${jobId}`, updatedJob, {
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
        throw new Error('Failed to update job');
      }
    }
  },
});