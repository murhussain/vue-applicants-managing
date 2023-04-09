import { useApplicantsStore } from '@/stores/ApplicantsStore'
import { PiniaVuePlugin, createPinia } from 'pinia';
import { beforeAll, beforeEach, describe, expect, it } from 'vitest';

describe('ApplicantsStore', () => {
  let pinia
  
  beforeEach(() => {
    pinia = createPinia()
    pinia.use(PiniaVuePlugin)
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

  describe('when applicants initialized', () => {
    let store;

    beforeAll(() => {
      store = useApplicantsStore(pinia);
      store.applicants = [
        {name: 'John Doe', email: 'john.doe@example.com', isNew: true},
        {name: 'Jane Doe', email: 'jane.doe@example.com', isShortlisted: true},
        {name: 'Jim Doe', email: 'jim.doe@example.com', isInterviewed: true},
      ];
    });

    it('should return the correct totalApplicants count', () => {
      expect(store.totalApplicants).toEqual(store.applicants.length);
    });

    it('should return the correct newApplicants', () => {
      expect(store.newApplicants).toEqual([
        { name: 'John Doe', email: 'john.doe@example.com', isNew: true }
      ]);
    });

    it('should return the correct totalNewApplicants count', () => {
      expect(store.totalNewApplicants).toEqual(store.newApplicants.length);
    });

    // it('should return the correct newApplicantsPercentage', () => {
    //   const percent = store.newApplicants.length / store.applicants.length;
    //   expect(store.newApplicantsPercentage).toEqual(percent);
    // });

    it('should return the correct shortlistedApplicants', () => {
      expect(store.shortlistedApplicants).toEqual([
        { name: 'Jane Doe', email: 'jane.doe@example.com', isShortlisted: true }
      ]);
    });

    it('should return the correct totalShortlistedApplicants count', () => {
      expect(store.totalShortlistedApplicants).toEqual(store.shortlistedApplicants.length);
    });

    // it('should return the correct shortlistedApplicantsPercentage', () => {
    //   expect(store.shortlistedApplicantsPercentage).toEqual(33.33333333333333);
    // });

    it('should return the correct interviewedApplicants', () => {
      expect(store.interviewedApplicants).toEqual([
        {name: 'Jim Doe', email: 'jim.doe@example.com', isInterviewed: true}
      ]);
    });

    it('should return the correct totalInterviewedApplicants count', () => {
      expect(store.totalInterviewedApplicants).toEqual(store.interviewedApplicants.length);
    });

    // it('should return the correct interviewedApplicantsPercentage', () => {
    //   expect(store.interviewedApplicantsPercentage).toEqual(33.33333333333333);
    // });
  });  
});