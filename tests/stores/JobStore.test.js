import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { useJobStore } from '@/stores/JobStore'
import { PiniaVuePlugin, createPinia } from 'pinia';
import { afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest';

describe('JobStore', () => {
  let pinia;
  let mock;

  const mockJobs = [
    { id: 5, name: "Mobile Developer",code: "MAD", initSalary: "2300" },
    { id: 7, name: "UI/UX Developer",code: "UIUX", initSalary: "2000" },
    { id: 8, name: "Fullstack Developer",code: "FULL", initSalary: "5000" }
  ];
  
  beforeEach(() => {
    pinia = createPinia();
    pinia.use(PiniaVuePlugin);
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  describe('Before initializing job', () => {
    it('should initialize with an empty jobs array', () => {
      const store = useJobStore(pinia);
      expect(store.jobs).toEqual([]);
    });

    it('should initialize with null job', () => {
      const store = useJobStore(pinia);
      expect(store.job).toBeNull();
    });

    it('should initialize with loading set to false', () => {
      const store = useJobStore(pinia);
      expect(store.loading).toBeFalsy();
    });

    it('should initialize with error set to null', () => {
      const store = useJobStore(pinia);
      expect(store.error).toBeNull();
    });
  });

  

  describe('when fetching jobs', () => { 
    let store;

    beforeAll(() => {
      store = useJobStore(pinia);
    });

    it('should initialize with an empty jobs array', async () => { 
      mock.onGet('http://localhost:3000/jobs').reply(200, []);

      expect(store.jobs).toEqual([]);
      expect(store.loading).toBeFalsy();
      expect(store.error).toBeNull();
    });

    it('should set the jobs array to the expected value after receiving a successful response', async () => { 
      mock.onGet('http://localhost:3000/jobs').reply(200, mockJobs);

      await store.fetchAndSetJobs();

      expect(store.jobs).toEqual(mockJobs);
      expect(store.loading).toBeFalsy();
      expect(store.error).toBeFalsy();
    });

    it('should throw an error when attempting to fetch jobs and the request fails', async () => {
      mock.onGet('http://localhost:3000/jobs').reply(500);
      
      await expect(store.fetchAndSetJobs()).rejects.toThrow('Failed to fetch jobs');

      expect(store.loading).toBeFalsy();
      expect(store.error).toEqual('Failed to fetch jobs');
    });

    it('should throw an error when attempting to fetch jobs and the request returns a 404 status code', async () => {
      mock.onGet('http://localhost:3000/jobs').reply(404);
    
      await expect(store.fetchAndSetJobs()).rejects.toThrow('Failed to fetch jobs');
    
      expect(store.loading).toBeFalsy();
      expect(store.error).toEqual('Failed to fetch jobs');
    });
    
  });

  describe('when fetching job with id', () => {
    let store

    beforeAll(() => {
      store = useJobStore(pinia);
    });

    it('should initialize with null job', async () => { 
      mock.onGet('http://localhost:3000/jobs/5').reply(200, null);

      expect(store.job).toBeNull();
      expect(store.loading).toBeFalsy();
      expect(store.error).toBeNull();
    });

    it('should set the job to the expected value after receiving a successful response', async () => {
      mock.onGet('http://localhost:3000/jobs/5').reply(200, mockJobs[0]);

      await store.fetchAndSetJob(5);

      expect(store.job).toEqual(mockJobs[0]);
      expect(store.loading).toBeFalsy();
      expect(store.error).toBeFalsy();
    });

    it('should throw an error when attempting to fetch job and the request fails', async () => {
      mock.onGet('http://localhost:3000/jobs/5').reply(500);
      
      await expect(store.fetchAndSetJob(5)).rejects.toThrow('Failed to fetch job');

      expect(store.loading).toBeFalsy();
      expect(store.error).toEqual('Failed to fetch job');
    });

    it('should throw an error when attempting to fetch job and the request returns a 404 status code', async () => {
      mock.onGet('http://localhost:3000/jobs/5').reply(404);
    
      await expect(store.fetchAndSetJob(5)).rejects.toThrow('Failed to fetch job');
      expect(store.loading).toBeFalsy();
      expect(store.error).toEqual('Failed to fetch job');
    });

    it('should remove a job from the jobs array', async () => {
      const deletedJobId = 7;
      mock.onDelete(`http://localhost:3000/jobs/${deletedJobId}`).reply(200);
    
      await store.deleteJob(deletedJobId);    
      expect(store.jobs).not.toContainEqual(expect.objectContaining({ id: deletedJobId }));
    });
  });

  it('should update the job with the given ID and fetch all jobs', async () => {
    const store = useJobStore(pinia);
    const jobId = 5;
    const updatedJob = { name: 'Updated Job', code: 'UJ', initSalary: '3000' };
    const mockUpdatedJob = { ...updatedJob, id: jobId };

    mock.onPut(`http://localhost:3000/jobs/${jobId}`).reply(200, mockUpdatedJob);
    mock.onGet('http://localhost:3000/jobs').reply(200, [mockUpdatedJob]);

    await store.updateJobById(jobId, updatedJob);

    expect(store.job).toEqual(mockUpdatedJob);
    expect(store.jobs).toEqual([mockUpdatedJob]);
    expect(store.loading).toBeFalsy();
    expect(store.error).toBeNull();
  });

  it('should handle errors when updating a job', async () => {
    const store = useJobStore(pinia);
    const jobId = 5;
    const updatedJob = { name: 'Updated Job', code: 'UJ', initSalary: '3000' };
    
    mock.onPut(`http://localhost:3000/jobs/${jobId}`).reply(500);
    await expect(store.updateJobById(jobId, updatedJob)).rejects.toThrow('Failed to update job');

    expect(store.job).toBeNull();
    expect(store.loading).toBeFalsy();
    expect(store.error).toEqual('Failed to update job');
  });
});