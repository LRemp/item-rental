import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';
import { Notifications } from '@mantine/notifications';
import AuthProvider from 'react-auth-kit';

import createStore from 'react-auth-kit/createStore';

const store = createStore({
  authName: '_auth',
  authType: 'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
});

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <AuthProvider store={store}>
        <Router />
      </AuthProvider>
      <Notifications />
    </MantineProvider>
  );
}
