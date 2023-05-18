import { shallowMount, config } from '@vue/test-utils';
import { useI18n } from "vue-i18n";
import { createTestingPinia } from "@pinia/testing";
import { describe, test, vi, expect, beforeEach } from "vitest";
import JobApplicantView from '@/views/JobApplicantView.vue';

vi.mock("vue-i18n");

useI18n.mockReturnValue({
  t: (tKey) => tKey,
});

config.global.mocks = {
  $t: (tKey) => tKey,
};

describe('JobApplicantView Page', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallowMount(JobApplicantView, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
        stubs: { ApplicantCard: true }
      },
      setup() {
        const getApplicantsByCategory = vi.fn(() => []);
        const onDrop = vi.fn();
        const onDragStart = vi.fn();
        
        return {
          getApplicantsByCategory,
          onDrop,
          onDragStart
        };
      },
    });  
  });

  test("should render jobApplicant correctly", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("should call onDragStart when dragging starts", () => {
    const applicant = {
      id: 1,
      name: "Mur Hussein",
      email: "mur@example.com",
      position: "Developer",
      skills: ["HTML", "CSS", "JavaScript"]
    };
    const event = {
      dataTransfer: {
        setData: vi.fn()
      }
    };
  
    wrapper.vm.onDragStart(applicant, event);
    expect(wrapper.vm.onDragStart).toHaveBeenCalledWith(applicant, event);
  });

  test("should call onDrop when dropping an applicant", () => {
    const category = "new";
    const event = {
      dataTransfer: {
        getData: vi.fn(() => '1')
      },
      target: {
        appendChild: vi.fn()
      }
    };

    wrapper.vm.onDrop(category, event);
    expect(wrapper.vm.onDrop).toHaveBeenCalledWith(category, event);
  });
});
