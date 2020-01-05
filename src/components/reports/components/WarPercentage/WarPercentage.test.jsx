import React from 'react';
import { mount, configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ThemeProvider } from '@material-ui/core';
import { act } from 'react-dom/test-utils';
import mockAxios from 'jest-mock-axios';
import theme from '../../../../theme';
import WarPercentage from './WarPercentage';
import { REACT_APP_API_URL } from '../../../../constants';

configure({ adapter: new Adapter() });

describe('<WarPercentage /> component', () => {
  let wrapper = null;

  beforeEach(() => {
    mockAxios.reset();
  });

  afterEach(() => {});

  test('should render component', async () => {
    wrapper = mount(
      <ThemeProvider theme={theme}>
        <WarPercentage />
      </ThemeProvider>
    );
    const component = wrapper.find('#war-percentage');
    expect(component.exists()).toBeTruthy();
  });

  test.skip('should call api on component mount', async () => {
    const response1 = {
      data: {
        report: {
          description: 'Average of infected people',
          average_infected: 0.09732824427480916,
        },
      },
    };
    const response2 = {
      data: {
        report: {
          description: 'Average of non-infected (healthy) people',
          average_healthy: 0.9026717557251909,
        },
      },
    };

    mockAxios.get.mockImplementation(() => Promise.resolve(response1));
    mockAxios.get.mockImplementation(() => Promise.resolve(response2));

    await act(async () => {
      wrapper = mount(
        <ThemeProvider theme={theme}>
          <WarPercentage />
        </ThemeProvider>
      );
    });

    expect(mockAxios.get).toHaveBeenCalledTimes(2);
    expect(mockAxios.get).toHaveBeenCalledWith(
      `${REACT_APP_API_URL}/api/report/infected.json`
    );
    expect(mockAxios.get).toHaveBeenCalledWith(
      `${REACT_APP_API_URL}/api/report/non_infected.json`
    );
    expect(wrapper.find('h2')[0].text()).toBe('90.10%');
    expect(wrapper.find('h2')[1].text()).toBe('9.90%');
  });
});
