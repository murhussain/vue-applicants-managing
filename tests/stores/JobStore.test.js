import { useJobStore } from '@/stores/JobStore'
import { PiniaVuePlugin, createPinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';

describe('JobStore', () => {
  let pinia

  beforeEach(() => {
    pinia = createPinia()
    pinia.use(PiniaVuePlugin)
  });

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

  it('should fetch and set the individual job', async () => {
    const store = useJobStore(pinia);
    await store.fetchAndSetJob(8);

    expect(store.job).toEqual({
      id: 8,
      name: "Business Analyst",
      code: "BA",
      initSalary: "5000",
      maxSalary: null,
    });
    expect(store.loading).toBeFalsy();
    expect(store.error).toBeNull();
  });
});