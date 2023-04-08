import { defineStore } from 'pinia';

export const useApplicantsStore = defineStore('applicant', {
  state: () => ({
    applicants: [],
    loading: false,
    error: null
  }),

  actions: {
    // Fetching applicants from the list
    async fetchAndSetApplicants() {
      this.applicants = []
      this.loading = true
      try {
        this.applicants = await fetch('http://localhost:3000/applicants')
        .then((response) => response.json())
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    }, 

    async fetchAndSetApplicantsCategory(jobCode) {
      this.applicants = []
      this.loading = true
      try {
        this.applicants = await fetch(`http://localhost:3000/applicants?jobCode=${jobCode}`)
        .then((response) => response.json())
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
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
