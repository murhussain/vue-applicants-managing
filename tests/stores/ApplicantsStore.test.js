import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { useApplicantsStore } from '@/stores/ApplicantsStore'
import { PiniaVuePlugin, createPinia } from 'pinia';
import { afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest';

describe('ApplicantsStore', () => {
  let pinia
  let mock;

  const mockApplicants = [
    {name: 'Mur Huss', jobCode: 'DEVOPS', email: 'murhuss@example.com', isNew: true},
    {name: 'Jane Doe', jobCode: 'UIUX', email: 'jane.doe@example.com', isShortlisted: true},
    {name: 'Jim Doe', jobCode: 'FULL', email: 'jim.doe@example.com', isInterviewed: true},
  ];
  
  beforeEach(() => {
    pinia = createPinia()
    pinia.use(PiniaVuePlugin)
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  describe('Before initialized', () => {
    it('should initialize with an empty jobs array', () => {
      const store = useApplicantsStore(pinia);
      expect(store.applicants).toEqual([]);
    });
  
    it('should initialize with loading set to false', () => {
      const store = useApplicantsStore(pinia);
      expect(store.loading).toBeFalsy();
    });
  
    it('should initialize with error set to null', () => {
      const store = useApplicantsStore(pinia);
      expect(store.error).toBeNull();
    });
  });

  describe('getters', () => {
    let store;

    beforeEach(() => {
      store = useApplicantsStore(pinia);
    });

    it('should return the correct totalApplicants', () => {
      store.applicants = [{}, {}, {}];
      expect(store.totalApplicants).toEqual(3);
    });
  });

  describe('when fetching applicants', () => {
    let store;

    beforeAll(() => {
      store = useApplicantsStore(pinia);
    });

    it('should initialize with an empty applicants array', async () => {
      mock.onGet('http://localhost:3000/applicants').reply(200, []);

      await store.fetchAndSetApplicants();
    
      expect(store.applicants).toEqual([]);
      expect(store.loading).toBeFalsy();
      expect(store.error).toBeNull();
    });

    it('should set the applicants array to the expected value after receiving a successful response', async () => {
      mock.onGet('http://localhost:3000/applicants').reply(200, mockApplicants);
    
      await store.fetchAndSetApplicants();
    
      expect(store.applicants).toEqual(mockApplicants);
      expect(store.loading).toBeFalsy();
      expect(store.error).toBeFalsy();
    });

    it('should return the expected data when it successfully fetches the applicants', async () => {
      mock.onGet('http://localhost:3000/applicants').reply(200, mockApplicants);
      
      await store.fetchAndSetApplicants();
  
      expect(store.loading).toBeFalsy();
      expect(store.error).toBeNull();
      expect(store.applicants).toEqual(mockApplicants);
    });

    it('should throw an error when attempting to fetch applicants and the request fails', async () => {
      mock.onGet('http://localhost:3000/applicants').reply(500);
      
      await expect(store.fetchAndSetApplicants()).rejects.toThrow('Failed to fetch applicants');

      expect(store.loading).toBeFalsy();
      expect(store.error).toEqual('Failed to fetch applicants');
    });

    it('should throw an error when attempting to fetch applicants and the request returns a 404 status code', async () => {
      mock.onGet('http://localhost:3000/applicants').reply(404);
    
      await expect(store.fetchAndSetApplicants()).rejects.toThrow('Failed to fetch applicants');
    
      expect(store.loading).toBeFalsy();
      expect(store.error).toEqual('Failed to fetch applicants');
    });
  });

  describe('when fetching applicants by job code', () => {
    let store;

    beforeAll(() => {
      store = useApplicantsStore(pinia);
    });

    it('should set the applicants array to the expected value after receiving a successful response', async () => {
      mock.onGet('http://localhost:3000/applicants?jobCode=jobCode').reply(200, mockApplicants);
    
      await store.fetchAndSetApplicantsCategory('jobCode');
    
      expect(store.applicants).toEqual(mockApplicants);
      expect(store.loading).toBeFalsy();
      expect(store.error).toBeFalsy();
    });

    it('should return the expected data when it successfully fetches the applicants based on job code', async () => {
      mock.onGet('http://localhost:3000/applicants?jobCode=jobCode').reply(200, mockApplicants);
      
      await store.fetchAndSetApplicantsCategory('jobCode');
  
      expect(store.loading).toBeFalsy();
      expect(store.error).toBeNull();
      expect(store.applicants).toEqual(mockApplicants);
    });

    it('should throw an error when attempting to fetch applicants based on job code and the request fails', async () => {
      mock.onGet('http://localhost:3000/applicants?jobCode=jobCode').reply(500);
      
      await expect(store.fetchAndSetApplicantsCategory('jobCode')).rejects.toThrow('Failed to fetch applicants');
  
      expect(store.loading).toBeFalsy();
      expect(store.error).toEqual('Failed to fetch applicants');
    });

    it('should throw an error when attempting to fetch applicants and the request returns a 404 status code', async () => {
      mock.onGet('http://localhost:3000/applicants').reply(404);
    
      await expect(store.fetchAndSetApplicants('jobCode')).rejects.toThrow('Failed to fetch applicants');
    
      expect(store.loading).toBeFalsy();
      expect(store.error).toEqual('Failed to fetch applicants');
    });
  });

  describe('when applicants initialized', () => {
    let store;

    beforeAll(() => {
      store = useApplicantsStore(pinia);
      store.applicants = [
        {name: 'Mur Huss', email: 'murhuss@example.com', isNew: true},
        {name: 'Jane Doe', email: 'jane.doe@example.com', isShortlisted: true},
        {name: 'Jim Doe', email: 'jim.doe@example.com', isInterviewed: true},
      ];
    });

    it('should return the correct totalApplicants count', () => {
      expect(store.totalApplicants).toEqual(store.applicants.length);
    });

    it('should return the correct newApplicants', () => {
      expect(store.newApplicants).toEqual([
        { category: 'new' }
      ]);
    });

    it('should return the correct totalNewApplicants count', () => {
      expect(store.totalNewApplicants).toEqual(store.newApplicants.length);
    })

    it('should return the correct shortlistedApplicants', () => {
      expect(store.shortlistedApplicants).toEqual([
        { name: 'Jane Doe', email: 'jane.doe@example.com', isShortlisted: true }
      ]);
    });

    it('should return the correct totalShortlistedApplicants count', () => {
      expect(store.totalShortlistedApplicants).toEqual(store.shortlistedApplicants.length);
    });

    it('should return the correct interviewedApplicants', () => {
      expect(store.interviewedApplicants).toEqual([
        {name: 'Jim Doe', email: 'jim.doe@example.com', isInterviewed: true}
      ]);
    });

    it('should return the correct totalInterviewedApplicants count', () => {
      expect(store.totalInterviewedApplicants).toEqual(store.interviewedApplicants.length);
    });
  });  
});