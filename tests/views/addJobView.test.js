import { mount, config } from '@vue/test-utils';
import { useI18n } from "vue-i18n";
import { describe, test, vi, expect } from "vitest";
import addJobView from '@/views/addJobView.vue';

vi.mock("vue-i18n");

useI18n.mockReturnValue({
  t: (tKey) => tKey,
});

config.global.mocks = {
  $t: (tKey) => tKey,
};

describe('addJobView', () => {
  test('renders input fields and a button', async () => {
    const wrapper = mount(addJobView);

    // Check if the input fields exist
    const nameInput = wrapper.find('input[type="text"][id="name"]');
    expect(nameInput.exists()).toBe(true);

    const codeInput = wrapper.find('input[type="text"][id="code"]');
    expect(codeInput.exists()).toBe(true);

    const initSalaryInput = wrapper.find('input[type="number"][id="initSalary"]');
    expect(initSalaryInput.exists()).toBe(true);

    const maxSalaryInput = wrapper.find('input[type="number"][id="maxSalary"]');
    expect(maxSalaryInput.exists()).toBe(true);

    // Check if the button exists
    const createButton = wrapper.find('button[type="submit"]');
    expect(createButton.exists()).toBe(true);
  });

  test('should render heading-3', async () => {
    const wrapper = mount(addJobView);
    const heading3 = wrapper.find('h3');
    
    expect(heading3.exists()).toBe(true);
  })

  test('should receive inputs data from user', async () => {
    const wrapper = mount(addJobView);

    await wrapper.find('input[id="name"]').setValue('murashi')
    await wrapper.find('input[id="code"]').setValue('UI')
    await wrapper.find('input[id="initSalary"]').setValue('300')
    await wrapper.find('input[id="maxSalary"]').setValue('300')
  });

  test('should submit the form data', async () => {
    const wrapper = mount(addJobView);

    const name = 'UI/UX Developer';
    const code = 'UI';
    const initSalary = '100';
    const maxSalary = '300';
    const form = wrapper.find('form');

    await wrapper.find('input[id="name"]').setValue(name)
    await wrapper.find('input[id="code"]').setValue(code)
    await wrapper.find('input[id="initSalary"]').setValue(initSalary)
    await wrapper.find('input[id="maxSalary"]').setValue(maxSalary)
    
    await form.trigger('submit.prevent');

    // Access the updated newJob object after form submission
    const newJob = wrapper.vm.newJob;

    // Reset the form after submission
    expect(newJob.name).toBe('');
    expect(newJob.code).toBe('');
    expect(newJob.initSalary).toBe('');
    expect(newJob.maxSalary).toBe('');
  });

  test('binds input fields to newJob object', async () => {
    const wrapper = mount(addJobView);
  
    const nameInput = wrapper.find('input[id="name"]');
    const codeInput = wrapper.find('input[id="code"]');
    const initSalaryInput = wrapper.find('input[id="initSalary"]');
    const maxSalaryInput = wrapper.find('input[id="maxSalary"]');
  
    // Enter values in the input fields
    await nameInput.setValue('UI/UX Developer');
    await codeInput.setValue('UI');
    await initSalaryInput.setValue(100);
    await maxSalaryInput.setValue(300);
  
    // Access the updated newJob object
    const newJob = wrapper.vm.newJob;
  
    // Check if the values are correctly bound
    expect(newJob.name).toBe('UI/UX Developer');
    expect(newJob.code).toBe('UI');
    expect(newJob.initSalary).toBe(100);
    expect(newJob.maxSalary).toBe(300);
  });

  test('validates numeric input fields', async () => {
    const wrapper = mount(addJobView);
  
    const initSalaryInput = wrapper.find('input[id="initSalary"]');
    const maxSalaryInput = wrapper.find('input[id="maxSalary"]');
  
    // Enter valid numeric values
    await initSalaryInput.setValue('100');
    await maxSalaryInput.setValue('300');
  
    // Check if the input values are valid
    expect(wrapper.find('.error-message').exists()).toBe(false);
  
    // Enter invalid non-numeric values
    await initSalaryInput.setValue('abc');
    await maxSalaryInput.setValue('xyz');
  
    // Check if the input values are invalid
    expect(wrapper.find('.error-message').exists()).toBe(false);
  });  
});