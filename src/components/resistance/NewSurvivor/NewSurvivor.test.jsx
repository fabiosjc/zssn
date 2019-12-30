import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NewSurvivor from './NewSurvivor';

configure({ adapter: new Adapter() });

beforeEach(() => {});

test('should render component', () => {
  const wrapper = shallow(<NewSurvivor />);
  const component = wrapper.find('#new-survivor');

  expect(component.exists()).toBeTruthy();
  expect(component.text().includes('ResistanceForm')).toBeTruthy();
  expect(component.text().includes('SurvivorProfile')).toBeTruthy();
});
