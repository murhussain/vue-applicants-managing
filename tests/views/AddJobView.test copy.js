// import { mount } from '@vue/test-utils';
// import { describe, test, expect } from "vitest";
// import AddJobView from '@/views/AddJobView.vue';

// describe('AddJobView', () => {
//   test('renders input fields and a button', async () => {
//     const wrapper = mount(AddJobView);

//     // Check if the input fields exist
//     const nameInput = wrapper.find('input[type="text"][id="name"]');
//     expect(nameInput.exists()).toBe(true);

//     await nameInput.setValue('murashi');
//     expect(nameInput.element.value).toBe('my@mail.com')

    
//     const codeInput = wrapper.find('input[type="text"][id="code"]');
//     expect(codeInput.exists()).toBe(true);

//     const initSalaryInput = wrapper.find('input[type="number"][id="initSalary"]');
//     expect(initSalaryInput.exists()).toBe(true);

//     const maxSalaryInput = wrapper.find('input[type="number"][id="maxSalary"]');
//     expect(maxSalaryInput.exists()).toBe(true);

//     // Check if the button exists
//     const createButton = wrapper.find('button[type="submit"]');
//     expect(createButton.exists()).toBe(true);
//   });
// });
