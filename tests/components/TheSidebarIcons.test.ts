import { mount } from '@vue/test-utils';
import TheSidebarIcons from '@/components/layout/portions/TheSidebarIcons.vue';

describe('Sidebar', () => {
  it('renders the correct icons based on the current route', () => {
    const mockRoute = {
      path: '/',
    };

    const wrapper = mount(TheSidebarIcons, {
      global: {
        mocks: {
          $route: mockRoute,
        },
      },
    });

    // Assert that the IconHome component is rendered with specific classes when the current route is '/'
    expect(wrapper.findComponent({ name: 'IconHome' }).classes()).toContain('text-body h-[1.6rem] w-[1.6rem]');

    // Change the current route
    mockRoute.path = '/jobs/applicants/123';

    // Assert that the IconUserGroup component is rendered with specific classes when the current route matches the pattern
    expect(wrapper.findComponent({ name: 'IconUserGroup' }).classes()).toContain(
      'text-body hover:text-white dark-hover:text-d-white dark:text-body h-[1.6rem] w-[1.6rem]');
  });

  it('renders the correct icon based on the dark mode state', () => {
    const mockIsDark = jest.fn().mockReturnValue(true);
    const mockToggleDark = jest.fn();

    const wrapper = mount(TheSidebarIcons, {
      global: {
        mocks: {
          $route: { path: '/' },
        },
        stubs: ['IconLight', 'IconDark'],
        provide: {
          isDark: mockIsDark,
          toggleDark: mockToggleDark,
        },
      },
    });

    // Assert that the IconDark component is rendered when isDark returns true
    expect(wrapper.findComponent({ name: 'IconDark' }).exists()).toBe(true);

    // Change the dark mode state
    mockIsDark.mockReturnValue(false);

    // Assert that the IconLight component is rendered when isDark returns false
    expect(wrapper.findComponent({ name: 'IconLight' }).exists()).toBe(true);
  });
});
