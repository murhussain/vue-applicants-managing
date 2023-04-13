import { describe, test, expect } from 'vitest';
import { computed } from 'vue';


describe('Computed properties', () => {
  const applicantsStoreMock = {
    totalApplicants: 10,
    newApplicants: [{}, {}, {}],
    shortlistedApplicants: [{}, {}],
    interviewedApplicants: [{}, {}, {}, {}],
  };

  const tApplicants = computed(() => applicantsStoreMock.totalApplicants);
  const newApplicants = computed(() => applicantsStoreMock.newApplicants);
  const tNew = computed(() => newApplicants.value.length);
  const shortlistedApplicants = computed(() => applicantsStoreMock.shortlistedApplicants);
  const tShortlisted = computed(() => shortlistedApplicants.value.length);
  const interviewedApplicants = computed(() => applicantsStoreMock.interviewedApplicants);
  const tInterviewed = computed(() => interviewedApplicants.value.length);
  const hasNewApplicants = computed(() => newApplicants.value.length > 0);
  const hasInterviewedApplicants = computed(() => interviewedApplicants.value.length > 0);
  const hasShortlistedApplicants = computed(() => shortlistedApplicants.value.length > 0);
  
  test('tApplicants should correctly return the total number of applicants', () => {
    expect(tApplicants.value).toBe(10);
  });

  test('tNew should correctly return the total number of new applicants', () => {
    expect(tNew.value).toBe(3);
  });

  test('tShortlisted should correctly return the total number of shortlisted applicants', () => {
    expect(tShortlisted.value).toBe(2);
  });

  test('tInterviewed should correctly return the total number of interviewed applicants', () => {
    expect(tInterviewed.value).toBe(4);
  });

  test('hasNewApplicants should return true if there are new applicants', () => {
    expect(hasNewApplicants.value).toBe(true);
  });

  test('hasInterviewedApplicants should return true if there are interviewed applicants', () => {
    expect(hasInterviewedApplicants.value).toBe(true);
  });

  test('hasShortlistedApplicants should return true if there are shortlisted applicants', () => {
    expect(hasShortlistedApplicants.value).toBe(true);
  });
});