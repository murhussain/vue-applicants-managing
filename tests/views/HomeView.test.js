import { shallowMount, config } from '@vue/test-utils';
import { useI18n } from "vue-i18n";
import { createTestingPinia } from "@pinia/testing";
import { describe, test, it, vi, expect, beforeEach } from "vitest";
import HomeView from '@/views/HomeView.vue';
import TheCategories from '@/components/shared/TheCategories.vue';

vi.mock("vue-i18n");

useI18n.mockReturnValue({
  t: (tKey) => tKey,
});

config.global.mocks = {
  $t: (tKey) => tKey,
};

describe('HomeView Page', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallowMount(HomeView, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
    });  
  });

  test("should render homeView correctly", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render TheCategories in the template', () => {
    expect(wrapper.findComponent(TheCategories).exists()).toBe(true);
  });
});