import axios from 'axios';
import { defineStore } from 'pinia';

interface Job {
  id: number;
  name: string;
  code: string;
  initSalary: number;
  maxSalary: number;
}

interface SelectedJobState {
  job: Job | null;
  loading: boolean;
  notSelected: string | null;
}

export const useSelectedJobStore = defineStore({
  id: 'selectedJob',

  state: (): SelectedJobState => ({
    job: null,
    loading: false,
    notSelected: null,
  }),

  getters: {
    selectedJob(): Job | null {
      return this.job;
    },
  },

  actions: {
    async selectJob(id: number): Promise<void> {
      this.loading = true;
      this.notSelected = null;
    
      try {
        const response = await axios.get<Job>(`http://localhost:3000/jobs/${id}`);
        const job = response.data;
        this.job = job;
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.notSelected = 'Failed to fetch job';
        throw new Error('Failed to fetch job');
      }
    }
  },
});
