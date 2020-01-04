import React from 'react';
import { mount, shallow, configure } from 'enzyme';
import { act } from 'react-dom/test-utils';

import Adapter from 'enzyme-adapter-react-16';
import mockAxios from 'jest-mock-axios';
import { REACT_APP_API_URL } from '../../../../constants';
import LostPoints from './LostPoints';

configure({ adapter: new Adapter() });

describe('<LostPoints /> component', () => {
  let wrapper = null;

  beforeEach(() => {});

  afterEach(() => {
    mockAxios.reset();
  });

  test('should render component', async () => {
    wrapper = shallow(<LostPoints />);
    const component = wrapper.find('#lost-points');
    expect(component.exists()).toBeTruthy();
  });

  test('should call api on component mount', async () => {
    const response = { data: { report: { total_points_lost: 7000 } } };
    mockAxios.get.mockImplementation(() => Promise.resolve(response));

    await act(async () => {
      wrapper = mount(<LostPoints />);
    });

    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(
      `${REACT_APP_API_URL}/api/report/infected_points.json`
    );
    expect(wrapper.find('h3#total-points-value').text()).toBe('7000');
  });
});
