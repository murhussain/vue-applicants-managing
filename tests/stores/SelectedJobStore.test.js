import { useSelectedJobStore } from '@/stores/SelectedJobStore'
import { PiniaVuePlugin, createPinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';


describe('SelectedJobStore', () => {
  let pinia

  beforeEach(() => {
    pinia = createPinia()
    pinia.use(PiniaVuePlugin)
  });

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

  it('should selectJob sets the selected job and clears error and loading', async () => {
    const store = useSelectedJobStore(pinia);
  
    await store.selectJob(8);
  
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

  it('should selectJob handles error when HTTP request fails', async () => {
    
    const store = useSelectedJobStore(pinia);
    await expect(store.selectJob(400)).rejects.toThrowError();

    expect(store.job).toBeNull();
    expect(store.loading).toBe(true);
    expect(store.error).toBeNull();
  });
});
