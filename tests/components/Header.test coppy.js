import { shallowMount, config } from '@vue/test-utils';
import { useI18n } from "vue-i18n";
import { describe, test, vi } from "vitest";
import { TheHeader } from '@/components/layout/TheHeader.vue';

vi.mock("vue-i18n");

useI18n.mockReturnValue({
  t: (tKey) => tKey,
});

config.global.mocks = {
  $t: (tKey) => tKey,
};


describe('AddJobView', () => {
  test('should render header component', async () => {
    const wrapper = shallowMount(TheHeader);
  })
});
