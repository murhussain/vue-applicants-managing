/**
 * @vitest-environment happy-dom 
 */

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

const App = {
  template: `<div>HELLO</div>`
}

describe('App', () => {
  it('should render the component', () => {
    const wrapper = mount(App)
    console.log(wrapper.html())
    expect(wrapper.html()).toBe('<div>HELLO</div>')
  })
}) 