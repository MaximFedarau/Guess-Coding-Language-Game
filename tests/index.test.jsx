import 'regenerator-runtime/runtime'; // for react-embed-gist
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import Home from 'pages/index';
import { store } from 'store/store';

describe('UI is correct.', () => {
  test('Counter is 0 at the beginning.', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Home />
      </Provider>,
    );
    expect(getByText('0')).toBeInTheDocument();
  });
  test('There is Spinner component at the beginning.', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Home />
      </Provider>,
    );
    expect(getByTestId('Spinner')).toBeInTheDocument();
  });
});

describe('Work with the API is correct.', () => {
  test('API key exists.', () => {
    expect(process.env.NEXT_PUBLIC_API_TOKEN).not.toBeUndefined();
  });
});
