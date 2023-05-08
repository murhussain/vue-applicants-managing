import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { useJobStore } from '../src/stores/JobStore';
import { PiniaVuePlugin, createPinia } from 'pinia';

describe('JobStore', () => {
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
      const deletedJobId: number = 7;
      const store = useJobStore(pinia);
      
      mock.onDelete(`http://localhost:3000/jobs/${deletedJobId}`).reply(200);
    
      await store.deleteJob(deletedJobId);    
      expect(store.jobs).not.toContainEqual(expect.objectContaining({ id: deletedJobId }));
    });
  });

  describe('when updating a job by ID', () => {

    const jobId: number = 5;
    const errorMessage = 'Failed to update job';
    const updatedJobResponse = { ...mockJobs[1], id: jobId };
    const expectedJobs = [updatedJobResponse, ...mockJobs.slice(1)];
  
    it('should update the job and fetch all jobs after receiving a successful response', async () => {
      const store = useJobStore(pinia);
      mock.onPut(`http://localhost:3000/jobs/${jobId}`).reply(200, mockJobs[1]);
      mock.onGet('http://localhost:3000/jobs').reply(200, mockJobs);
  
      await store.updateJobById(jobId, mockJobs[1]);
  
      expect(store.job).toEqual(mockJobs[1]);
      expect(store.jobs).toEqual(mockJobs);
      expect(store.loading).toBeFalsy();
      expect(store.error).toBeNull();
    });
  
    it('should throw an error when attempting to update a job and the request fails', async () => {
      const store = useJobStore(pinia);
      mock.onPut(`http://localhost:3000/jobs/${jobId}`).reply(500);
  
      await expect(store.updateJobById(jobId, mockJobs[1])).rejects.toThrow('Failed to update job');
  
      expect(store.job).toBeNull();
      expect(store.jobs).toEqual([]);
      expect(store.loading).toBeFalsy();
      expect(store.error).toEqual('Failed to update job');
    });

    it('should not update the job property when the server returns an error', async () => {
      const store = useJobStore(pinia);
      mock.onPut(`http://localhost:3000/jobs/${jobId}`).reply(500, { message: errorMessage });
  
      await expect(store.updateJobById(jobId, mockJobs[1])).rejects.toThrow(errorMessage);
      expect(store.job).toBeNull();
      expect(store.loading).toBeFalsy();
      expect(store.error).toEqual(errorMessage);
    });

    it('should update the jobs property and fetch all jobs after successfully updating a job', async () => {
      
      const store = useJobStore(pinia);
      mock.onPut(`http://localhost:3000/jobs/${jobId}`).reply(200, updatedJobResponse);
      mock.onGet('http://localhost:3000/jobs').reply(200, expectedJobs);
  
      await store.updateJobById(jobId, mockJobs[1]);
      expect(store.job).toEqual(updatedJobResponse);
      expect(store.loading).toBeFalsy();
      expect(store.error).toBeNull();
      expect(store.jobs).toEqual(expectedJobs);
    });
  
    it('should set loading and error properties accordingly when updating a job fails', async () => {
      const store = useJobStore(pinia);

      mock.onPut(`http://localhost:3000/jobs/${jobId}`).reply(500);
  
      await expect(store.updateJobById(jobId, mockJobs[1])).rejects.toThrow('Failed to update job');
      expect(store.loading).toBeFalsy();
      expect(store.error).toEqual('Failed to update job');
    });

    it('should throw an error when attempting to update a job and the request returns a 404 status code', async () => {
      const store = useJobStore(pinia);
      mock.onPut(`http://localhost:3000/jobs/${jobId}`).reply(404);
    
      await expect(store.updateJobById(jobId, mockJobs[1])).rejects.toThrow('Failed to update job');
    
      expect(store.loading).toBeFalsy();
      expect(store.error).toEqual('Failed to update job');
      expect(store.job).toBeNull();
    });
  
    it('should reset loading and error properties after updating a job', async () => {
      const store = useJobStore(pinia);

      mock.onPut(`http://localhost:3000/jobs/${jobId}`).reply(200);
      mock.onGet('http://localhost:3000/jobs').reply(200, mockJobs);
  
      await store.updateJobById(jobId, mockJobs[1]);
      expect(store.loading).toBeFalsy();
      expect(store.error).toBeNull();
    });
  });

  describe('when deleting a job by ID', () => {

    const jobId: number = 5;
    const expectedJobs = mockJobs.slice(1);

    it('should delete a job and update the jobs property', async () => {
      const store = useJobStore(pinia);

      store.jobs = mockJobs;
      mock.onDelete(`http://localhost:3000/jobs/${jobId}`).reply(200);
      mock.onGet('http://localhost:3000/jobs').reply(200, expectedJobs);
    
      await store.deleteJob(jobId);
    
      expect(store.jobs).toEqual(expectedJobs);
      expect(store.loading).toBeFalsy();
      expect(store.error).toBeNull();
    })

    it('should reset loading and error properties after deleting a job', async () => {
      const store = useJobStore(pinia);

      const jobId: number = 1;
      mock.onDelete(`http://localhost:3000/jobs/${jobId}`).reply(200);
      mock.onGet('http://localhost:3000/jobs').reply(200, mockJobs.slice(1));

      await store.deleteJob(jobId);
      expect(store.loading).toBeFalsy();
      expect(store.error).toBeNull();
    });
  });

  describe('when creating a job', () => {
    const expectedJob = { ...mockJobs[1], id: 1 };

    it('should add the job to the jobs array and set job to null on success', async () => {
      const store = useJobStore(pinia);
      
      mock.onPost('http://localhost:3000/jobs').reply(201, expectedJob);
      await store.createJob(mockJobs[1]);
      expect(store.jobs).toContainEqual(expectedJob);
      expect(store.job).toBeNull();
      expect(store.loading).toBeFalsy();
      expect(store.error).toBeNull();
    });
  
    it('should throw an error when attempting to create a job and the request fails', async () => {
      const store = useJobStore(pinia);
      
      mock.onPost('http://localhost:3000/jobs').reply(500);
      await expect(store.createJob(mockJobs[1])).rejects.toThrow('Failed to create job');
      expect(store.loading).toBeFalsy();
      expect(store.error).toEqual('Failed to create job');
    });
  
    it('should throw an error when attempting to create a job and the request returns a 400 status code', async () => {
      const store = useJobStore(pinia);
      
      mock.onPost('http://localhost:3000/jobs').reply(400);
      await expect(store.createJob(mockJobs[1])).rejects.toThrow('Failed to create job');
      expect(store.loading).toBeFalsy();
      expect(store.error).toEqual('Failed to create job');
    });

    it('should create a job with the expected fields', async () => {
      const store = useJobStore(pinia);
      
      mock.onPost('http://localhost:3000/jobs').reply(201, expectedJob);
      await store.createJob(mockJobs[1]);
      const createdJob = store.jobs[0];
      expect(createdJob.name).toEqual(mockJobs[1].name);
      expect(createdJob.code).toEqual(mockJobs[1].code);
      expect(createdJob.initSalary).toEqual(mockJobs[1].initSalary);
      expect(createdJob.id).toBeDefined();
    });

    it('should send the appropriate headers with the request', async () => {
      const store = useJobStore(pinia);
      
      mock.onPost('http://localhost:3000/jobs').reply((config) => {
        expect(config.headers['Content-Type']).toEqual('application/json');
        return [201, {}];
      });
      await store.createJob(mockJobs[1]);
    });
    
    it('should display an error message if the user submits an incomplete job form', async () => {
      const store = useJobStore(pinia);
      
      mock.onPost('http://localhost:3000/jobs').reply(400);
      await expect(store.createJob(mockJobs[1])).rejects.toThrow('Failed to create job');
      expect(store.loading).toBeFalsy();
      expect(store.error).toEqual('Failed to create job');
    });
    
    it('should throw an error when attempting to create a job and the request returns a 404 status code', async () => {
      const store = useJobStore(pinia);
      
      mock.onPost('http://localhost:3000/jobs').reply(404);
      await expect(store.createJob(mockJobs[1])).rejects.toThrow('Failed to create job');
      expect(store.loading).toBeFalsy();
      expect(store.error).toEqual('Failed to create job');
    });   
  });
});