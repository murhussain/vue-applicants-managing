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

  test('making sure that inputs receives data', async () => {
    const wrapper = mount(addJobView);

    // Name
    const nameInput = wrapper.find('input[id="name"]')
    await nameInput.setValue('murashi')
    expect(nameInput.element.value).toBe('murashi')

    // Code
    const codeInput = wrapper.find('input[id="code"]')
    await codeInput.setValue('UI')
    expect(codeInput.element.value).toBe('UI')

    // Initial salary
    const initSalaryInput = wrapper.find('input[id="initSalary"]')
    await initSalaryInput.setValue('300')
    expect(initSalaryInput.element.value).toBe('300')

    // Maximum salary
    const maxSalaryInput = wrapper.find('input[id="maxSalary"]')
    await maxSalaryInput.setValue('300')
    expect(maxSalaryInput.element.value).toBe('300')
  });
});
