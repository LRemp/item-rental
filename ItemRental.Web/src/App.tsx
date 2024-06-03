import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import { NavigationProgress } from '@mantine/nprogress';
import AuthProvider from 'react-auth-kit';

import createStore from 'react-auth-kit/createStore';
import { theme } from './theme';
import { Router } from './Router';

import { format, render, cancel, register } from 'timeago.js';

const localeFunc = (diff: number, idx: number, totalSec?: number): [string, string] => {
  const locales = [
    ['ką tik', 'right now'],
    ['prieš %s sekundes', 'in %s seconds'],
    ['prieš 1 minutę', 'in 1 minute'],
    ['prieš %s minutes', 'in %s minutes'],
    ['prieš 1 valandą', 'in 1 hour'],
    ['prieš %s valandas', 'in %s hours'],
    ['prieš 1 dieną', 'in 1 day'],
    ['prieš %s dienas', 'in %s days'],
    ['prieš 1 savaitę', 'in 1 week'],
    ['prieš %s savaites', 'in %s weeks'],
    ['prieš 1 mėnesį', 'in 1 month'],
    ['prieš %s mėnesius', 'in %s months'],
    ['prieš 1 metus', 'in 1 year'],
    ['prieš %s metus', 'in %s years'],
  ];
  return locales[idx] as [string, string];
};

register('lt', localeFunc);

const store = createStore({
  authName: '_auth',
  authType: 'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
});

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <ModalsProvider>
        <NavigationProgress />
        <AuthProvider store={store}>
          <Router />
        </AuthProvider>
        <Notifications />
      </ModalsProvider>
    </MantineProvider>
  );
}
