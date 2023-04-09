import { useSelectedJobStore } from '@/stores/SelectedJobStore'
import { PiniaVuePlugin, createPinia } from 'pinia';
import { beforeEach, describe, expect, test } from 'vitest';


describe('SelectedJobStore', () => {
  let pinia

  beforeEach(() => {
    pinia = createPinia()
    pinia.use(PiniaVuePlugin)
  })

  test('selectJob sets the selected job and clears error and loading', async () => {
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

  test('selectJob handles error when HTTP request fails', async () => {
    
    const store = useSelectedJobStore(pinia);
    await expect(store.selectJob(400)).rejects.toThrowError();

    expect(store.job).toBeNull();
    expect(store.loading).toBe(true);
    expect(store.error).toBeNull();
  });
});
