import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader'
import App from './route';

render(
  <AppContainer>
    <App/>
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./route', () => {
    const NextApp = require('./route').default;
    render(
      <AppContainer>
        <NextApp/>
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
