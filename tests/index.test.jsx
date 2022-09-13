import 'regenerator-runtime/runtime'; // for react-embed-gist
import { render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';

import Home from 'pages/index';
import { gistFetching } from 'utils/gistFetching';
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

  test('Fetching method works correctly.', async () => {
    const gist = await gistFetching();
    expect(gist).not.toBeUndefined();
    expect(typeof gist).toBe('object');
  });

  // ! Warning: This test can fail in some cases, because of randomness + the API speed. But it works correctly.
  test('Has option buttons after fetch.', async () => {
    const { queryAllByRole } = render(
      <Provider store={store}>
        <Home />
      </Provider>,
    );
    await gistFetching(); // waiting for the end of the API fetch
    await waitFor(
      () => {
        expect(queryAllByRole('button')).toHaveLength(4);
      },
      {
        timeout: 4000, // max time for waiting
      },
    );
  });
});
