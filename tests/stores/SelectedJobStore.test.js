import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { useSelectedJobStore } from '@/stores/SelectedJobStore'
import { PiniaVuePlugin, createPinia } from 'pinia';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

describe('SelectedJobStore', () => {
  let pinia

  let mock;

  const mockJobs = [
    { id: 5, name: "Mobile Developer",code: "MAD", initSalary: "2300" },
    { id: 7, name: "UI/UX Developer",code: "UIUX", initSalary: "2000" },
    { id: 8, name: "Fullstack Developer",code: "FULL", initSalary: "5000" }
  ];

  beforeEach(() => {
    pinia = createPinia()
    pinia.use(PiniaVuePlugin)
    mock = new MockAdapter(axios)
  });

  afterEach(() => {
    mock.restore();
  });

  describe('Before initializing job', () => {
    it('should initialize with null job', () => {
      const store = useSelectedJobStore(pinia);
      expect(store.job).toBeNull();
    });
  
    it('should initialize with loading set to false', () => {
      const store = useSelectedJobStore(pinia);
      expect(store.loading).toBeFalsy();
    });
  
    it('should initialize with error set to null', () => {
      const store = useSelectedJobStore(pinia);
      expect(store.error).toBeNull();
    });
  });
});
