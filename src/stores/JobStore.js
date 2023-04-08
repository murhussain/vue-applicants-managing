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
      this.jobs = []
      this.loading = true
      try {
        this.jobs = await fetch('http://localhost:3000/jobs')
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

    // Fetching an individual job based on provided id
    async fetchAndSetJob(id) {
      this.job = null
      this.loading = true
      try {
        this.job = await fetch(`http://localhost:3000/jobs/${id}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
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

    // Deleting an existing job
    async deleteJob(id) { 
      this.loading = true
      try {
        await fetch(`http://localhost:3000/jobs/${id}`, {
          method: 'DELETE'
        })
        this.jobs = this.jobs.filter((job) => job.id !== id)
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

    // Updating an existing job
    async updateJob(updatedJob) {
      this.loading = true
      try {
        const response = await fetch(`http://localhost:3000/jobs/${updatedJob.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedJob)
        })
        const updatedJob = await response.json()
        this.jobs = this.jobs.map((job) => job.id === updatedJob.id ? updatedJob : job)
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
  },

});
