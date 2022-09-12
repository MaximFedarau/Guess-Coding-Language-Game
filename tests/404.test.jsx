import { render } from '@testing-library/react';

import Page404 from 'pages/404';

// mocking Head Next.js component to check the <title>
jest.mock('next/head', () => {
  return {
    __esModule: true,
    default: ({ children }) => {
      return <>{children}</>;
    },
  };
});

describe('UI is correct', () => {
  test('Standard and unchanged UI.', () => {
    const page = render(<Page404 />);
    // <body> + <title> check
    expect(page.baseElement).toMatchSnapshot();
  });
});
