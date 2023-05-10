import { mount } from '@vue/test-utils';
// import { createMockFn } from 'vitest-utils';
import { describe, test, expect } from 'vitest';
import AddJobView from '@/views/AddJobView.vue';

describe('AddJobView', () => {
  test('form fields update the model data correctly', async () => {
    const wrapper = mount(AddJobView);

    const nameInput = wrapper.find('#name');
    await nameInput.setValue('Test Name');
    expect(wrapper.vm.newJob.name).toBe('Test Name');

    const codeInput = wrapper.find('#code');
    await codeInput.setValue('Test Code');
    expect(wrapper.vm.newJob.code).toBe('Test Code');

    const initSalaryInput = wrapper.find('#initSalary');
    await initSalaryInput.setValue('1000');
    expect(wrapper.vm.newJob.initSalary).toBe('1000');

    const maxSalaryInput = wrapper.find('#maxSalary');
    await maxSalaryInput.setValue('2000');
    expect(wrapper.vm.newJob.maxSalary).toBe('2000');
  });

  // test('submitting the form calls the correct methods', async () => {
  //   const createJobMock = createMockFn();
  //   const flashMock = createMockFn();
  //   const pushMock = createMockFn();

  //   const wrapper = mount(AddJobView, {
  //     globals: {
  //       $router: {
  //         push: pushMock
  //       },
  //       $i18n: {
  //         t: key => key
  //       },
  //       useJobStore: () => ({
  //         createJob: createJobMock
  //       }),
  //       useFlash: () => ({
  //         flash: flashMock
  //       })
  //     }
  //   });

  //   await wrapper.find('form').trigger('submit');

  //   expect(createJobMock).toHaveBeenCalled();
  //   expect(flashMock).toHaveBeenCalledWith('success', 'notifications.jobAdded');
  //   expect(pushMock).toHaveBeenCalledWith('/');

  //   // Reset newJob object
  //   expect(wrapper.vm.newJob).toEqual({
  //     name: '',
  //     code: '',
  //     initSalary: '',
  //     maxSalary: ''
  //   });
  // });
});
