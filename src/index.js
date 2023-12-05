import React from 'react';
import { IntlProvider } from 'react-intl';
import Cookies from 'js-cookie';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import messagesEN from './translations/en.json';
import messagesTH from './translations/th.json';
import messagesNL from './translations/nl.json';

import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import store from './redux/store';

const domNode = document.getElementById('root');
const root = createRoot(domNode);

const messages = {
  en: messagesEN,
  nl: messagesNL,
  th: messagesTH,
};
let language = navigator.language.split(/[-_]/)[0];
const cookieLanguage = Cookies.get('language');
if (cookieLanguage) {
  language = cookieLanguage;
}
language = language in messages ? language : 'en';
Cookies.set('language', language);

const theme = Cookies.get('theme');
if (theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <IntlProvider
        locale={navigator.language}
        messages={messages[language]}
      >
        <App />
      </IntlProvider>
    </BrowserRouter>
  </Provider>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
