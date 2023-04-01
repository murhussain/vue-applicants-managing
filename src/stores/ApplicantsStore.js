import { defineStore } from 'pinia';

export const useApplicantStore = defineStore('applicant', {
  state: () => ({
    applicants: [],
    error: null
  }),
  actions: {
    async fetchApplicants(jobCode) {
      this.loading = true
      try {
        const response = await fetch(`http://localhost:3000/applicants?jobCode=${jobCode}`)
        if (!response.ok) {
          throw new Error(`Failed to fetch applicants: ${response.statusText}`)
        }
        const data = await response.json()
        this.applicants = data
        this.error = null
      } catch (error) {
        console.error(error)
        this.error = 'Failed to fetch applicants'
      } finally {
        this.loading = false
      }
    
      // Filter the applicants to return the matching one based on the jobCode
      const matchingApplicant = this.applicants.find(applicant => applicant.jobCode === jobCode)
      return matchingApplicant
    }
  }
})