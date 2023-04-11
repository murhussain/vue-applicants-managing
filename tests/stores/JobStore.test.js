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
  });
});