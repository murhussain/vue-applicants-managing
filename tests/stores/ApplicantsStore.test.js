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
    describe('Total applicants getter', () => { 
      it('should return the correct totalApplicants count', () => {
        expect(store.totalApplicants).toEqual(store.applicants.length);
      });
    });

    describe('NewApplicants getter', () => {
      it('should return all applicants with category "new"', () => {
        const mockApplicants = [
          { id: 1, name: 'Alice', category: 'new' },
          { id: 2, name: 'Bob', category: 'shortlisted' }, 
          { id: 3, name: 'Charlie', category: 'new' },
          { id: 4, name: 'David', category: 'interviewed' },
        ];
        store.applicants = mockApplicants;
  
        const newApplicants = store.newApplicants;
  
        expect(newApplicants).toHaveLength(2);
        expect(newApplicants).toContainEqual(mockApplicants[0]);
        expect(newApplicants).toContainEqual(mockApplicants[2]);
      });
  
      it('should return an empty array if there are no new applicants', () => {
        const mockApplicants = [
          { id: 1, name: 'Alice', category: 'shortlisted' },
          { id: 2, name: 'Bob', category: 'interviewed' }, 
          { id: 3, name: 'Charlie', category: 'interviewed' },
        ];
        store.applicants = mockApplicants;
  
        const newApplicants = store.newApplicants;
        expect(newApplicants).toHaveLength(0);
      });

      it('should return the correct totalNewApplicants count', () => {
        expect(store.totalNewApplicants).toEqual(store.newApplicants.length);
      });
    });

    const mockShortlistedApplicants = [
      { id: 1, name: 'John', category: 'new' },
      { id: 2, name: 'Jane', category: 'shortlisted' },
      { id: 3, name: 'Bob', category: 'shortlisted' },
      { id: 4, name: 'Alice', category: 'interviewed' },
    ];
    
    describe('shortlistedApplicants getter', () => {
      beforeEach(() => {
        store.applicants = mockShortlistedApplicants;
      });
    
      it('should return an array of shortlisted applicants', () => {
        const shortlisted = store.shortlistedApplicants;
        expect(Array.isArray(shortlisted)).toBe(true);
        expect(shortlisted.length).toBe(2); // there are 2 applicants with 'shortlisted' category
        expect(shortlisted.every(applicant => applicant.category === 'shortlisted')).toBe(true);
      });
    
      it('should not include applicants with a different category', () => {
        const shortlisted = store.shortlistedApplicants;
        expect(shortlisted.some(applicant => applicant.category !== 'shortlisted')).toBe(false);
      });

      it('should return the correct totalShortlistedApplicants count', () => {
        expect(store.totalShortlistedApplicants).toEqual(store.shortlistedApplicants.length);
      });
    });

    const mockInterviewedApplicants = [
      { id: 1, name: 'John', category: 'new' },
      { id: 2, name: 'Jane', category: 'shortlisted' },
      { id: 3, name: 'Bob', category: 'interviewed' },
      { id: 4, name: 'Alice', category: 'interviewed' },
    ];

    describe('interviewedApplicants getter', () => {
      beforeEach(() => {
        store.applicants = mockInterviewedApplicants;
      });
    
      it('should return an array of interviewed applicants', () => {
        const interviewed = store.interviewedApplicants;
        expect(Array.isArray(interviewed)).toBe(true);
        expect(interviewed.length).toBe(2); // there are 2 applicants with 'interviewed' category
        expect(interviewed.every(applicant => applicant.category === 'interviewed')).toBe(true);
      });
    
      it('should not include applicants with a different category', () => {
        const interviewed = store.interviewedApplicants;
        expect(interviewed.some(applicant => applicant.category !== 'interviewed')).toBe(false);
      });

      it('should return the correct totalInterviewedApplicants count', () => {
        expect(store.totalInterviewedApplicants).toEqual(store.interviewedApplicants.length);
      });
    });
  });

  describe('updateApplicantCategory', () => {
    let mockAxios;
    let store;
  
    beforeEach(() => {
      mockAxios = new MockAdapter(axios);
      store = useApplicantsStore(pinia);
    });
  
    afterEach(() => {
      mockAxios.restore();
    });
  
    // it('should update the category of an applicant', async () => {
    //   const store = useApplicantsStore(pinia);
    //   const applicantId = 1;
    //   const newCategory = 'shortlisted';
  
    //   // Set up the mock response for axios
    //   mockAxios
    //     .onPatch(`http://localhost:3000/applicants/${applicantId}`, { category: newCategory })
    //     .reply(200, {});
  
    //   // Modify the mock response to include the updated applicant data
    //   mockAxios
    //     .onGet(`http://localhost:3000/applicants/${applicantId}`)
    //     .reply(200, { id: applicantId, name: 'Test Applicant', category: newCategory });
  
    //   // Call the action to update the applicant category
    //   await store.updateApplicantCategory(applicantId, newCategory);
  
    //   // Check that the applicant category has been updated in the store
    //   const updatedApplicant = store.applicants.find(applicant => applicant.id === applicantId);
    //   expect(updatedApplicant.category).toEqual(newCategory);
    // });
  
    it('should throw an error when the update request fails', async () => {
      const applicantId = 1;
      const newCategory = 'shortlisted';
  
      // Set up the mock response for axios to fail
      mockAxios
        .onPatch(`http://localhost:3000/applicants/${applicantId}`, { category: newCategory })
        .reply(500);
  
      // Call the action to update the applicant category and expect it to throw an error
      await expect(store.updateApplicantCategory(applicantId, newCategory)).rejects.toThrow('Failed to update applicant category');
    });
  });
});