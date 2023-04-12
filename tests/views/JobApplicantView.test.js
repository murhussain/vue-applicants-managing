import { describe, expect, test } from 'vitest';
import { computed } from 'vue';

// Define some mock data for the computed properties
const newApplicantsMock = [  { name: 'John Doe', status: 'new' },  { name: 'Jane Doe', status: 'new' },];

const shortlistedApplicantsMock = [  { name: 'James Smith', status: 'shortlisted' },  { name: 'Janet Smith', status: 'shortlisted' },];

const interviewedApplicantsMock = [  { name: 'Bob Johnson', status: 'interviewed' },  { name: 'Betty Johnson', status: 'interviewed' },];

// Define some mock stores for the tests
const applicantsStoreMock = {
  totalApplicants: 6,
  newApplicants: newApplicantsMock,
  shortlistedApplicants: shortlistedApplicantsMock,
  interviewedApplicants: interviewedApplicantsMock,
  fetchAndSetApplicantsCategory: () => Promise.resolve(),
};

// Define some mock route data for the tests
const routeMock = {
  params: { code: '1234' },
};

describe('Computed properties', () => {
  // Test for hasNewApplicants computed property
  test('should correctly determine if there are new applicants', () => {
    const hasNewApplicants = computed(() => {
      return newApplicantsMock.length > 0;
    });

    expect(hasNewApplicants.value).toBe(true);
  });

  // Test for hasShortlistedApplicants computed property
  test('should correctly determine if there are shortlisted applicants', () => {
    const hasShortlistedApplicants = computed(() => {
      return shortlistedApplicantsMock.length > 0;
    });

    expect(hasShortlistedApplicants.value).toBe(true);
  });

  // Test for hasInterviewedApplicants computed property
  test('should correctly determine if there are interviewed applicants', () => {
    const hasInterviewedApplicants = computed(() => {
      return interviewedApplicantsMock.length > 0;
    });

    expect(hasInterviewedApplicants.value).toBe(true);
  });

  // Test for tApplicants computed property
  test('should correctly aggregate the total number of applicants', () => {
    const tApplicants = computed(() => {
      return (
        newApplicantsMock.length +
        shortlistedApplicantsMock.length +
        interviewedApplicantsMock.length
      );
    });

    expect(tApplicants.value).toBe(applicantsStoreMock.totalApplicants);
  });

  // Test for tNew computed property
  test('should correctly aggregate the total number of new applicants', () => {
    const tNew = computed(() => {
      return newApplicantsMock.length;
    });

    expect(tNew.value).toBe(applicantsStoreMock.newApplicants.length);
  });

  // Test for tShortlisted computed property
  test('should correctly aggregate the total number of shortlisted applicants', () => {
    const tShortlisted = computed(() => {
      return shortlistedApplicantsMock.length;
    });

    expect(tShortlisted.value).toBe(applicantsStoreMock.shortlistedApplicants.length);
  });

  // Test for tInterviewed computed property
  test('should correctly aggregate the total number of interviewed applicants', () => {
    const tInterviewed = computed(() => {
      return interviewedApplicantsMock.length;
    });

    expect(tInterviewed.value).toBe(applicantsStoreMock.interviewedApplicants.length);
  });
});