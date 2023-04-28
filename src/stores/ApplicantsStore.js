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
    if (error.response && error.response.status === 400) {
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

export const useApplicantsStore = defineStore('applicant', {
  state: () => ({
    applicants: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchAndSetApplicants() {
      this.loading = true;
      this.error = null;

      try {
        const response = await axiosInstance.get('/applicants');
        this.applicants = response.data;
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.error = 'Failed to fetch applicants';
        throw new Error('Failed to fetch applicants');
      }
    },

    async fetchAndSetApplicantsCategory(jobCode) {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await axiosInstance.get(`/applicants?jobCode=${jobCode}`)
        this.applicants = response.data;
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.error = 'Failed to fetch applicants';
        throw new Error('Failed to fetch applicants');
      }
    },

    async updateApplicantCategory(applicantId, newCategory) {
      try {
        await axiosInstance.patch(`/applicants/${applicantId}`, { category: newCategory });
        const response = await axiosInstance.get(`/applicants/${applicantId}`);
        const updatedApplicant = response.data;
        const applicantIndex = this.applicants.findIndex(applicant => applicant.id === updatedApplicant.id);
        if (applicantIndex !== -1) {
          this.applicants[applicantIndex] = updatedApplicant;
        }
      } catch (error) {
        this.error = 'Failed to fetch applicants';
        throw new Error('Failed to update applicant category');
      }
    }
  },

  getters: {

    totalApplicants(state) {
      return state.applicants.length
    }, 

    // Related new applicants getter functions
    newApplicants(state) {
      return state.applicants.filter(applicant => applicant.category === 'new')
    },

    totalNewApplicants(state) { 
      return state.applicants.filter(applicant => applicant.category === 'new').length 
    },

    // Related shortlisted applicants getter functions
    shortlistedApplicants(state) {
      return state.applicants.filter(applicant => applicant.category === 'shortlisted')
    },

    totalShortlistedApplicants(state) { 
      return state.applicants.filter(applicant => applicant.category === 'shortlisted').length 
    },

    // Related interviewed applicants getter functions    
    interviewedApplicants(state) {
      return state.applicants.filter(applicant => applicant.category === 'interviewed')
    },

    totalInterviewedApplicants(state) { 
      return state.applicants.filter(applicant => applicant.category === 'interviewed').length 
    },
  }
});
