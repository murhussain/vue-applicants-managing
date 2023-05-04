import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { useSelectedJobStore } from '../../src/stores/SelectedJobStore';
import { PiniaVuePlugin, createPinia } from 'pinia';
// import { afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest';

describe('SelectedJobStore', () => {
  let pinia

  let mock

  const mockJobs = [
    { id: 5, name: "Mobile Developer", code: "MAD", initSalary: 2300, maxSalary: 2300  },
    { id: 7, name: "UI/UX Developer", code: "UIUX", initSalary: 2000, maxSalary: 2300  },
    { id: 8, name: "Fullstack Developer", code: "FULL", initSalary: 5000, maxSalary: 2300  }
  ]

  beforeEach(() => {
    pinia = createPinia()
    pinia.use(PiniaVuePlugin)
    mock = new MockAdapter(axios)
  })

  afterEach(() => {
    mock.restore();
  })

  describe('Before initializing job', () => {
    it('should initialize with null job', () => {
      const store = useSelectedJobStore(pinia)
      expect(store.job).toBeNull()
    }, 10000);
  
    it('should initialize with loading set to false', () => {
      const store = useSelectedJobStore(pinia)
      expect(store.loading).toBeFalsy()
    }, 10000);
  
    it('should initialize with error set to null', () => {
      const store = useSelectedJobStore(pinia)
      expect(store.notSelected).toBeNull()
    }, 10000);
  });

  describe('when selecting a job', () => {
    let store;
  
    beforeAll(() => {
      store = useSelectedJobStore(pinia);
    });
  
    it('should set the selected job in the store on success', async () => {
      const jobId = 1;
      const expectedJob = { id: jobId, name: 'Backend Developer', code: 'BE', initSalary: 4000, maxSalary: 2300 };
      mock.onGet(`http://localhost:3000/jobs/${jobId}`).reply(200, expectedJob);
  
      await store.selectJob(jobId);
  
      expect(store.job).toEqual(expectedJob);
      expect(store.loading).toBeFalsy();
      // expect(store.notSelected).toBeNull();
    }, 10000);
  
    it('should throw an error when attempting to select a job and the request fails', async () => {
      const jobId = 1;
      mock.onGet(`http://localhost:3000/jobs/${jobId}`).reply(500);
  
      await expect(store.selectJob(jobId)).rejects.toThrow('Failed to fetch job');
  
      expect(store.loading).toBeFalsy();
      expect(store.notSelected).toEqual('Failed to fetch job');
    }, 10000);
  
    it('should throw an error when attempting to select a job and the request returns a 404 status code', async () => {
      const jobId = 1;
      mock.onGet(`http://localhost:3000/jobs/${jobId}`).reply(404);
  
      await expect(store.selectJob(jobId)).rejects.toThrow('Failed to fetch job');
  
      expect(store.loading).toBeFalsy();
      expect(store.notSelected).toEqual('Failed to fetch job');
    }, 10000);
  });

  it('should return null when no job has been selected', () => {
    const store = useSelectedJobStore(pinia);
    const selectedJob = store.selectedJob;
    expect(selectedJob).toBeNull();
  }, 10000);

  it('should return the selected job when a job has been selected', () => {
    const store = useSelectedJobStore(pinia);
    const expectedJob = mockJobs[0];
    store.job = expectedJob;
    const selectedJob = store.selectedJob;
    expect(selectedJob).toEqual(expectedJob);
  }, 10000);
});