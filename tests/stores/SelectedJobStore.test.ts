import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { useSelectedJobStore } from '../../src/stores/SelectedJobStore';
import { PiniaVuePlugin, createPinia } from 'pinia';

describe('SelectedJobStore', () => {
  let pinia;
  let mock;

  const mockJobs = [
    { id: 5, name: "Mobile Developer", code: "MAD", initSalary: 2300, maxSalary: 2300 },
    { id: 7, name: "UI/UX Developer", code: "UIUX", initSalary: 2000, maxSalary: 2300 },
    { id: 8, name: "Fullstack Developer", code: "FULL", initSalary: 5000, maxSalary: 2300 }
  ];

  beforeEach(() => {
    pinia = createPinia();
    pinia.use(PiniaVuePlugin);
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  describe('Testing initialization of state  variables', () => {
    
    it('initializes the state variables', () => {
      const store = useSelectedJobStore(pinia);
      // expect(store.job).toBe(null);
      // expect(store.loading).toBe(false);
      // expect(store.notSelected).toBe(null);
      expect(store.job).toBeNull();
      expect(store.loading).toBeFalsy();
      expect(store.notSelected).toBeNull();
    });

    it('returns null when no job is selected', () => {
      const store = useSelectedJobStore(pinia);
      expect(store.selectedJob).toBeNull();
    });
    
  })

  describe('Testing http request', () => {
    it('sets loading to true during the request', async () => {
      const store = useSelectedJobStore(pinia);
      const id = 1;
      mock.onGet(`http://localhost:3000/jobs/${id}`).reply(200, {});
    
      const promise = store.selectJob(id);
    
      expect(store.loading).toBe(true);
    
      await promise;
    });

    it('sets loading to false after the request', async () => {
      const store = useSelectedJobStore(pinia);
      const id = 1;
      mock.onGet(`http://localhost:3000/jobs/${id}`).reply(200, {});
    
      await store.selectJob(id);
    
      expect(store.loading).toBe(false);
    });
    

    it('fetches and sets the selected job', async () => {
      const store = useSelectedJobStore(pinia);
  
      mock.onGet('http://localhost:3000/jobs/5').reply(200, mockJobs[0]);
  
      await store.selectJob(5);
  
      expect(store.selectedJob).toEqual(mockJobs[0]);
      expect(store.loading).toBe(false);
      expect(store.notSelected).toBe(null);
    }, 1000);

    it('should throw an error when attempting to select a job and the request fails', async () => {
      const store = useSelectedJobStore(pinia);
      const jobId = 1;
      mock.onGet(`http://localhost:3000/jobs/${jobId}`).reply(500);
  
      await expect(store.selectJob(jobId)).rejects.toThrow('Failed to fetch job');
  
      expect(store.loading).toBeFalsy();
      expect(store.notSelected).toEqual('Failed to fetch job');
    }, 1000);
    
    it('returns the selected job', async () => {
      const store = useSelectedJobStore(pinia);
      mock.onGet(`http://localhost:3000/jobs/${mockJobs[0].id}`).reply(200, mockJobs[0]);
    
      await store.selectJob(mockJobs[0].id);
    
      expect(store.selectedJob).toEqual(mockJobs[0]);
    }, 1000);
    
    it('handles errors when fetching a job', async () => {
      const store = useSelectedJobStore(pinia);
  
      mock.onGet('http://localhost:3000/jobs/99').reply(404);
  
      await expect(store.selectJob(99)).rejects.toThrow('Failed to fetch job');
      expect(store.selectedJob).toBe(null);
      expect(store.loading).toBe(false);
      expect(store.notSelected).toBe('Failed to fetch job');
    }, 1000);
  })
});