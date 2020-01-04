import React from 'react';
import { mount, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import MiniCard from './MiniCard';

configure({ adapter: new Adapter() });

describe('<MiniCard /> component', () => {
  let wrapper = null;

  test('should render component', async () => {
    wrapper = shallow(<MiniCard />);
    const component = wrapper.find('#mini-card');
    expect(component.exists()).toBeTruthy();
  });

  test('should render the passed amount', async () => {
    wrapper = mount(
      <MiniCard
        resource={'Water'}
        icon={<InvertColorsIcon />}
        color={'blue'}
        amount={100}
      />
    );

    expect(wrapper.find('h3').text()).toBe('100');
  });
});
