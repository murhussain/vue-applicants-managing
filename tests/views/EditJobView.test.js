import { shallowMount, config } from '@vue/test-utils';
import { useI18n } from "vue-i18n";
import { createTestingPinia } from "@pinia/testing";
import { describe, test, vi, expect, beforeEach } from "vitest";
import EditJobView from '@/views/EditJobView.vue';
import { useRouter } from 'vue-router';

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

    useRouter().push.mockReset();
  });
});