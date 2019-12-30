import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import About from './About';

configure({ adapter: new Adapter() });

beforeEach(() => {});

test('should render component', async () => {
  const wrapper = mount(<About />);
  const component = wrapper.find('#about');

  expect(component.exists()).toBeTruthy();
});
