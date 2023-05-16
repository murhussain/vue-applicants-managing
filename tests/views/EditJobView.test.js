import { shallowMount, config } from '@vue/test-utils';
import { useI18n } from "vue-i18n";
import { createTestingPinia } from "@pinia/testing";
import { describe, test, vi, expect, beforeEach } from "vitest";
import EditJobView from '@/views/EditJobView.vue';
import { useRoute, useRouter } from 'vue-router';

vi.mock("vue-i18n");
vi.mock('vue-router');

useI18n.mockReturnValue({
  t: (tKey) => tKey,
});

config.global.mocks = {
  $t: (tKey) => tKey,
};

describe('AddJobView', () => {
  let wrapper = null;

  useRouter.mockReturnValue({
    push: vi.fn(),
  });

  useRoute.mockReturnValue({
    params: {
      jobId: 'jobId',
    },
  });

  beforeEach(() => {
    wrapper = shallowMount(EditJobView, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
    });
    // useRouter().push.mockReset();
  });

  test('Should render heading for title of page', async () => {
    const heading3 = wrapper.find('h3');

    expect(heading3.exists()).toBe(true);
  });

  test('renders the correct heading', () =>{
    const heading = wrapper.find('h3');
    expect(heading.exists()).toBe(true);
    expect(heading.text()).toBe('pages.updateJob');
  });

  test('renders the loading state', () => {
    const loadingSpinner = wrapper.findComponent({ name: 'LoaderXl' });
    expect(loadingSpinner.exists()).toBe(false);
  });
});