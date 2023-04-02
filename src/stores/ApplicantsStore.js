import { defineStore } from 'pinia';

export const useApplicantsStore = defineStore('applicant', {
  state: () => ({
    applicants: []
  }),

  actions: {
    async fetchAndSetApplicants() {
      const response = await fetch('http://localhost:3000/applicants');
      const applicants = await response.json();
      this.applicants = applicants;
    }
  }
});
