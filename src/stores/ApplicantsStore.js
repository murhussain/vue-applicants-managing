import axios from 'axios';
import { defineStore } from 'pinia';

export const useApplicantsStore = defineStore('applicant', {
  state: () => ({
    applicants: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchAndSetApplicants() {
      try {
        const response = await axios.get('http://localhost:3000/applicants');
        this.applicants = response.data;
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.error = 'Failed to fetch applicants';
        throw new Error('Failed to fetch applicants');
      }
    },


    async fetchAndSetApplicantsCategory(jobCode) {
      try {
        const response = await axios.get(`http://localhost:3000/applicants?jobCode=${jobCode}`)
        this.applicants = response.data;
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.error = 'Failed to fetch applicants';
        throw new Error('Failed to fetch applicants');
      }
    }
  },

  getters: {

    totalApplicants(state) {
      return state.applicants.length
    }, 

    // Related new applicants getter functions
    newApplicants(state) {
      return state.applicants.filter(applicant => applicant.isNew)
    },

    totalNewApplicants(state) { 
      return state.applicants.filter(applicant => applicant.isNew).length 
    },

    newApplicantsPercentage(state, getters) {
      return ((getters.totalNewApplicants / getters.totalApplicants) * 100)
    },

    // Related shortlisted applicants getter functions
    shortlistedApplicants(state) {
      return state.applicants.filter(applicant => applicant.isShortlisted)
    },

    totalShortlistedApplicants(state) { 
      return state.applicants.filter(applicant => applicant.isShortlisted).length 
    },

    shortlistedApplicantsPercentage(state, getters) {
      return ((getters.totalShortlistedApplicants / getters.totalApplicants) * 100)
    },

    // Related interviewed applicants getter functions    
    interviewedApplicants(state) {
      return state.applicants.filter(applicant => applicant.isInterviewed)
    },

    totalInterviewedApplicants(state) { 
      return state.applicants.filter(applicant => applicant.isInterviewed).length 
    },

    interviewedApplicantsPercentage(state, getters) {
      return ((getters.totalInterviewedApplicants / getters.totalApplicants) * 100)
    }
  }
});
