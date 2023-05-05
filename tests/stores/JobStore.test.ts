import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { useJobStore } from '../../src/stores/JobStore';
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
      const store = useJobStore(pinia);

      expect(store.job).toBeNull();
      expect(store.jobs).toEqual([]);
      expect(store.loading).toBeFalsy();
      expect(store.error).toBeNull();
    });
  });

  // describe('Testing http request', () => {
  //   it('sets loading to true during the request', async () => {
  //     const store = useJobStore(pinia);
  //     const id = 1;
  //     mock.onGet(`http://localhost:3000/jobs/${id}`).reply(200, {});
    
  //     const promise = store.selectJob(id);
    
  //     expect(store.loading).toBe(true);
    
  //     await promise;
  //   });
  // });

  describe('when fetching jobs', () => { 
    
    it('should initialize with an empty jobs array', async () => { 
      const store = useJobStore(pinia);

      mock.onGet('http://localhost:3000/jobs').reply(200, []);

      expect(store.jobs).toEqual([]);
      expect(store.loading).toBeFalsy();
      expect(store.error).toBeNull();
    }, 1000);

    it('should set the jobs array to the expected value after receiving a successful response', async () => { 
      const store = useJobStore(pinia);

      mock.onGet('http://localhost:3000/jobs').reply(200, mockJobs);
      await store.fetchAndSetJobs();

      expect(store.jobs).toEqual(mockJobs);
      expect(store.loading).toBeFalsy();
      expect(store.error).toBeFalsy();
    }, 1000);

    it('should throw an error when attempting to fetch jobs and the request fails', async () => {
      const store = useJobStore(pinia);

      mock.onGet('http://localhost:3000/jobs').reply(500);
      
      await expect(store.fetchAndSetJobs()).rejects.toThrow('Failed to fetch jobs');

      expect(store.loading).toBeFalsy();
      expect(store.error).toEqual('Failed to fetch jobs');
    }, 1000);

    it('should throw an error when attempting to fetch jobs and the request returns a 404 status code', async () => {
      const store = useJobStore(pinia);

      mock.onGet('http://localhost:3000/jobs').reply(404);
    
      await expect(store.fetchAndSetJobs()).rejects.toThrow('Failed to fetch jobs');
    
      expect(store.loading).toBeFalsy();
      expect(store.error).toEqual('Failed to fetch jobs');
    }, 1000);
  });

  describe('when fetching job with id', () => {
    
    it('should initialize with null job', async () => { 
      const store = useJobStore(pinia);
      
      mock.onGet('http://localhost:3000/jobs/5').reply(200, null);

      expect(store.job).toBeNull();
      expect(store.loading).toBeFalsy();
      expect(store.error).toBeNull();
    });

    it('should set the job to the expected value after receiving a successful response', async () => {
      const store = useJobStore(pinia);
      
      mock.onGet('http://localhost:3000/jobs/5').reply(200, mockJobs[0]);

      await store.fetchAndSetJob(5);

      expect(store.job).toEqual(mockJobs[0]);
      expect(store.loading).toBeFalsy();
      expect(store.error).toBeFalsy();
    });

    it('should throw an error when attempting to fetch job and the request fails', async () => {
      const store = useJobStore(pinia);
      
      mock.onGet('http://localhost:3000/jobs/5').reply(500);
      
      await expect(store.fetchAndSetJob(5)).rejects.toThrow('Failed to fetch job');

      expect(store.loading).toBeFalsy();
      expect(store.error).toEqual('Failed to fetch job');
    });

    it('should throw an error when attempting to fetch job and the request returns a 404 status code', async () => {
      const store = useJobStore(pinia);
      
      mock.onGet('http://localhost:3000/jobs/5').reply(404);
    
      await expect(store.fetchAndSetJob(5)).rejects.toThrow('Failed to fetch job');
      expect(store.loading).toBeFalsy();
      expect(store.error).toEqual('Failed to fetch job');
    });

    it('should remove a job from the jobs array', async () => {
      const deletedJobId = 7;
      const store = useJobStore(pinia);
      
      mock.onDelete(`http://localhost:3000/jobs/${deletedJobId}`).reply(200);
    
      await store.deleteJob(deletedJobId);    
      expect(store.jobs).not.toContainEqual(expect.objectContaining({ id: deletedJobId }));
    });
  });
});