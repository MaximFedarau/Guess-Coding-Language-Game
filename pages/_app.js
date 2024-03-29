import 'regenerator-runtime/runtime'; // for react-embed-gist
import { Provider } from 'react-redux';

import 'styles/global.css';
import { store } from 'store/store';

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
