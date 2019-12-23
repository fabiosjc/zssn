import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Location from './location';

configure({ adapter: new Adapter() });

beforeEach(() => {});

test('should render component', () => {
  const wrapper = shallow(<Location />);
  const component = wrapper.find('#location');

  expect(component.exists()).toBeTruthy();

  expect(
    component
      .find('.card-header')
      .html()
      .includes('Update Location')
  ).toBeTruthy();
});
