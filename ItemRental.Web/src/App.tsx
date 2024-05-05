import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import { NavigationProgress } from '@mantine/nprogress';
import AuthProvider from 'react-auth-kit';

import createStore from 'react-auth-kit/createStore';
import { theme } from './theme';
import { Router } from './Router';

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
