import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Location from './location';
import mockAxios from 'jest-mock-axios';

jest.mock('react-notifications');

const { NotificationManager } = jest.requireActual('react-notifications');

configure({ adapter: new Adapter() });

describe('<Location />', () => {
  let wrapper, component;
  const setIsLoading = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation(isLoading => [isLoading, setIsLoading]);

  beforeEach(() => {
    wrapper = shallow(<Location />);
    component = wrapper.find('#location');
  });

  afterEach(() => {
    // cleaning up the mess left behind the previous test
    mockAxios.reset();
  });

  test('should render component', () => {
    expect(component.exists()).toBeTruthy();

    expect(
      component
        .find('.card-header')
        .html()
        .includes('Update Location')
    ).toBeTruthy();
  });

  test('should set survivor id when text field changes', () => {
    const event = {
      target: { name: 'survivorId', value: '1234' },
    };
    wrapper.find('#member-id').simulate('change', event);

    expect(wrapper.find('#member-id').prop('value')).toEqual('1234');
  });

  test('should search when click on search icon (buttom) - success case', async () => {
    const data = {};
    mockAxios.get.mockImplementation(() => Promise.resolve(data));

    wrapper
      .find('#member-id')
      .simulate('change', { target: { name: 'survivorId', value: '1234' } });

    wrapper.find('#search-btn').simulate('click');

    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(
      `http://zssn-backend-example.herokuapp.com/api/people/1234.json`
    );
  });

  test('should display a notification when request has problems', async () => {
    const result = {
      response: {
        data: 'record not found',
      },
    };
    mockAxios.get.mockReturnValue(Promise.reject(result));

    wrapper
      .find('#member-id')
      .simulate('change', { target: { name: 'survivorId', value: '1234' } });

    wrapper.find('#search-btn').simulate('click');

    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    //FIX-ME
    //expect(NotificationManager.error).toHaveBeenCalledTimes(1);
  });
});
