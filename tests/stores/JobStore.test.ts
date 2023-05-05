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
});