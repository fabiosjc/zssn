import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './app';

test('redirect to new survivor page ', () => {
  const redirectUrl = '/add-for-resistence';

  const { container } = render(
    <MemoryRouter initialEntries={['/my/initial/route']}>
      <App />
    </MemoryRouter>
  );

  expect(container.baseURI).toEqual(expect.stringContaining(redirectUrl));
});
