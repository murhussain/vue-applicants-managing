import { mount } from '@vue/test-utils';
import { describe, test, expect } from "vitest";
import addJobView from '@/views/addJobView.vue';

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
});