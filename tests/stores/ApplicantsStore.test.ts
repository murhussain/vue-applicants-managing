import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { useApplicantsStore } from '../../src/stores/ApplicantsStore'
import { PiniaVuePlugin, createPinia } from 'pinia';

describe('JobStore', () => {
  let pinia;
  let mock;

  const mockApplicants = [
    { 
      id: 1, 
      name: 'Mur Huss', 
      jobCode: 'DEVOPS', 
      position:"soft engineer", 
      email: 'murhuss@example.com',
      skills: [
        { name: 'flutter'},
      ],
      category: 'new',
    },
    { 
      id: 2, 
      name: 'Jane Doe', 
      jobCode: 'UIUX', 
      position:"soft engineer", 
      email: 'jane.doe@example.com',
      skills: [
        { name: 'flutter'},
        { name: 'dart'},
      ],
      category: 'shortlisted'
    },
    { 
      id: 3, 
      name: 'Jim Doe', 
      jobCode: 'FULL', 
      position:"soft engineer", 
      email: 'jim.doe@example.com',
      skills: [
        { name: 'Django'},
      ],
      category: 'interviewed'
    },
  ];

  beforeEach(() => {
    pinia = createPinia();
    pinia.use(PiniaVuePlugin);
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

    it('should return the correct totalApplicants', () => {
      const store = useApplicantsStore(pinia);

      store.applicants = [
        {
          id: 1,
          name: 'Mur Huss',
          jobCode: 'DEVOPS',
          position: "soft engineer", 
          email: 'murhuss@example.com',
          skills: [{ name: 'flutter' }],
          category: 'new',
        },
      ];
      expect(store.totalApplicants).toEqual(1);
    });

    describe('when fetching applicants', () => {

      it('should initialize with an empty applicants array', async () => {
        const store = useApplicantsStore(pinia);

        mock.onGet('http://localhost:3000/applicants').reply(200, []);
  
        await store.fetchAndSetApplicants();
      
        expect(store.applicants).toEqual([]);
        expect(store.loading).toBeFalsy();
        expect(store.error).toBeNull();
      });
  
      it('should set the applicants array to the expected value after receiving a successful response', async () => {
        const store = useApplicantsStore(pinia);

        mock.onGet('http://localhost:3000/applicants').reply(200, mockApplicants);
      
        await store.fetchAndSetApplicants();
      
        expect(store.applicants).toEqual(mockApplicants);
        expect(store.loading).toBeFalsy();
        expect(store.error).toBeFalsy();
      });
  
      it('should return the expected data when it successfully fetches the applicants', async () => {
        const store = useApplicantsStore(pinia);

        mock.onGet('http://localhost:3000/applicants').reply(200, mockApplicants);
        
        await store.fetchAndSetApplicants();
    
        expect(store.loading).toBeFalsy();
        expect(store.error).toBeNull();
        expect(store.applicants).toEqual(mockApplicants);
      });
  
      it('should throw an error when attempting to fetch applicants and the request fails', async () => {
        const store = useApplicantsStore(pinia);

        mock.onGet('http://localhost:3000/applicants').reply(500);
        
        await expect(store.fetchAndSetApplicants()).rejects.toThrow('Failed to fetch applicants');
  
        expect(store.loading).toBeFalsy();
        expect(store.error).toEqual('Failed to fetch applicants');
      });
  
      it('should throw an error when attempting to fetch applicants and the request returns a 404 status code', async () => {
        const store = useApplicantsStore(pinia);

        mock.onGet('http://localhost:3000/applicants').reply(404);
      
        await expect(store.fetchAndSetApplicants()).rejects.toThrow('Failed to fetch applicants');
      
        expect(store.loading).toBeFalsy();
        expect(store.error).toEqual('Failed to fetch applicants');
      });
    });
  });

  describe('when fetching applicants by job code', () => {

    it('should set the applicants array to the expected value after receiving a successful response', async () => {
      const store = useApplicantsStore(pinia);

      mock.onGet('http://localhost:3000/applicants?jobCode=jobCode').reply(200, mockApplicants);
    
      await store.fetchAndSetApplicantsCategory('jobCode');
    
      expect(store.applicants).toEqual(mockApplicants);
      expect(store.loading).toBeFalsy();
      expect(store.error).toBeFalsy();
    });

    it('should return the expected data when it successfully fetches the applicants based on job code', async () => {
      const store = useApplicantsStore(pinia);

      mock.onGet('http://localhost:3000/applicants?jobCode=jobCode').reply(200, mockApplicants);
      
      await store.fetchAndSetApplicantsCategory('jobCode');
  
      expect(store.loading).toBeFalsy();
      expect(store.error).toBeNull();
      expect(store.applicants).toEqual(mockApplicants);
    });

    it('should throw an error when attempting to fetch applicants based on job code and the request fails', async () => {
      const store = useApplicantsStore(pinia);

      mock.onGet('http://localhost:3000/applicants?jobCode=jobCode').reply(500);
      
      await expect(store.fetchAndSetApplicantsCategory('jobCode')).rejects.toThrow('Failed to fetch applicants');
  
      expect(store.loading).toBeFalsy();
      expect(store.error).toEqual('Failed to fetch applicants');
    });

    it('should throw an error when attempting to fetch applicants and the request returns a 404 status code', async () => {
      const store = useApplicantsStore(pinia);

      mock.onGet('http://localhost:3000/applicants').reply(404);
      await expect(store.fetchAndSetApplicantsCategory('jobCode')).rejects.toThrow('Failed to fetch applicants');
    
      expect(store.loading).toBeFalsy();
      expect(store.error).toEqual('Failed to fetch applicants');
    });
  });

  describe('when applicants initialized', () => {
    let store;

    beforeAll(() => {
      store = useApplicantsStore(pinia);
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
        expect(interviewed.length).toBe(2);
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