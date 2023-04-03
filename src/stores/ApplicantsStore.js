import { defineStore } from 'pinia';

export const useApplicantsStore = defineStore('applicant', {
  state: () => ({
    applicants: []
  }),

  actions: {
    async fetchAndSetApplicants(jobCode = "FRONT") {
      const response = await fetch(`http://localhost:3000/applicants?jobCode=${jobCode}`);
      const applicants = await response.json();
      this.applicants = applicants;
    }
  },
  
  getters: {
    newApplicants(state) {
      return state.applicants.filter(applicant => applicant.isNew)
    },

    shortlistedApplicants(state) {
      return state.applicants.filter(applicant => applicant.isShortlisted)
    },

    interviewedApplicants(state) {
      return state.applicants.filter(applicant => applicant.isInterviewed)
    },

    totalApplicants(state) {
      return state.applicants.length
    }, 

    totalNewApplicants(state) { 
      return state.applicants.filter(applicant => applicant.isNew).length 
    },

    totalShortlistedApplicants(state) { 
      return state.applicants.filter(applicant => applicant.isShortlisted).length 
    },

    totalInterviewedApplicants(state) { 
      return state.applicants.filter(applicant => applicant.isInterviewed).length 
    }
  }
});
