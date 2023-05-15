import { shallowMount, config } from '@vue/test-utils';
import { useI18n } from "vue-i18n";
import { createTestingPinia } from "@pinia/testing";
import { describe, test, vi, expect, beforeEach } from "vitest";
import AddJobView from '@/views/AddJobView.vue';
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
    wrapper = shallowMount(AddJobView, {
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

  test('Should render heading for title of page', async () => {
    const heading3 = wrapper.find('h3');

    expect(heading3.exists()).toBe(true);
  });

  test('renders input fields and a button', async () => {
    const nameInput = wrapper.find('input[type="text"][id="name"]');
    expect(nameInput.exists()).toBe(true);

    const codeInput = wrapper.find('input[type="text"][id="code"]');
    expect(codeInput.exists()).toBe(true);

    const initSalaryInput = wrapper.find('input[type="number"][id="initSalary"]');
    expect(initSalaryInput.exists()).toBe(true);

    const maxSalaryInput = wrapper.find('input[type="number"][id="maxSalary"]');
    expect(maxSalaryInput.exists()).toBe(true);

    const createButton = wrapper.find('button[type="submit"]');
    expect(createButton.exists()).toBe(true);
  });

  test('should render heading-3', async () => {
    const heading3 = wrapper.find('h3');
    expect(heading3.exists()).toBe(true);
  });

  test('should receive inputs data from user', async () => {
    await wrapper.find('input[id="name"]').setValue('murashi');
    await wrapper.find('input[id="code"]').setValue('UI');
    await wrapper.find('input[id="initSalary"]').setValue('300');
    await wrapper.find('input[id="maxSalary"]').setValue('300');
  });

  test('should submit the form data', async () => {
    const name = 'UI/UX Developer';
    const code = 'UI';
    const initSalary = '100';
    const maxSalary = '300';
    const form = wrapper.find('form');

    await wrapper.find('input[id="name"]').setValue(name);
    await wrapper.find('input[id="code"]').setValue(code);
    await wrapper.find('input[id="initSalary"]').setValue(initSalary);
    await wrapper.find('input[id="maxSalary"]').setValue(maxSalary);
    await form.trigger('submit.prevent');

    const newJob = wrapper.vm.newJob;

    // Reset the form after submission
    expect(newJob.name).toBe('');
    expect(newJob.code).toBe('');
    expect(newJob.initSalary).toBe('');
    expect(newJob.maxSalary).toBe('');

    expect(useRouter().push).toHaveBeenCalledWith('/');
  });

  test('should not submit the form data if the form is invalid', async () => {
    const form = wrapper.find('form');

    await form.trigger('submit.prevent');

    expect(useRouter().push).not.toHaveBeenCalled();
  });

  test('renders the correct heading', () =>{
    const heading = wrapper.find('h3');
    expect(heading.exists()).toBe(true);
    expect(heading.text()).toBe('pages.createJob');
  });

  test('renders the correct button text', () => {
    const button = wrapper.find('button[type="submit"]');
    expect(button.exists()).toBe(true);
    expect(button.text()).toBe('pages.createBtn');
  });

  test('should display the correct text in the label span for name', async () => {
    // Get the label element
    const label = wrapper.find('label[for="name"]');
    expect(label.exists()).toBe(true);
  
    // Get the span element inside the label
    const labelSpan = label.find('span.label');
    expect(labelSpan.exists()).toBe(true);
  
    // Get the expected text from the translation
    const expectedText = wrapper.vm.$t('job.name:');
  
    // Check if the text in the label span matches the expected text
    expect(labelSpan.text()).toBe(expectedText);
  });

  test('should display the correct text in the label span for code', async () => {
    // Get the label element
    const label = wrapper.find('label[for="code"]');
    expect(label.exists()).toBe(true);
  
    // Get the span element inside the label
    const labelSpan = label.find('span.label');
    expect(labelSpan.exists()).toBe(true);
  
    // Get the expected text from the translation
    const expectedText = wrapper.vm.$t('job.code:');
  
    // Check if the text in the label span matches the expected text
    expect(labelSpan.text()).toBe(expectedText);
  });

  test('should display the correct text in the label span for initSalary', async () => {
    // Get the label element
    const label = wrapper.find('label[for="initSalary"]');
    expect(label.exists()).toBe(true);
  
    // Get the span element inside the label
    const labelSpan = label.find('span.label');
    expect(labelSpan.exists()).toBe(true);
  
    // Get the expected text from the translation
    const expectedText = wrapper.vm.$t('job.initSalary:');
  
    // Check if the text in the label span matches the expected text
    expect(labelSpan.text()).toBe(expectedText);
  });

  test('should display the correct text in the label span for maxSalary', async () => {
    // Get the label element
    const label = wrapper.find('label[for="maxSalary"]');
    expect(label.exists()).toBe(true);
  
    // Get the span element inside the label
    const labelSpan = label.find('span.label');
    expect(labelSpan.exists()).toBe(true);
  
    // Get the expected text from the translation
    const expectedText = wrapper.vm.$t('job.maxSalary:');
  
    // Check if the text in the label span matches the expected text
    expect(labelSpan.text()).toBe(expectedText);
  });

  test('renders the correct input type', () => {
    const nameInput = wrapper.find('input[type="text"][id="name"]');
    expect(nameInput.exists()).toBe(true);
    expect(nameInput.attributes('type')).toBe('text');

    const codeInput = wrapper.find('input[type="text"][id="code"]');
    expect(codeInput.exists()).toBe(true);
    expect(codeInput.attributes('type')).toBe('text');

    const initSalaryInput = wrapper.find('input[type="number"][id="initSalary"]');
    expect(initSalaryInput.exists()).toBe(true);
    expect(initSalaryInput.attributes('type')).toBe('number');

    const maxSalaryInput = wrapper.find('input[type="number"][id="maxSalary"]');
    expect(maxSalaryInput.exists()).toBe(true);
    expect(maxSalaryInput.attributes('type')).toBe('number');
  })
});
