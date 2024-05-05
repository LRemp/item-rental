import { useState } from 'react';
import { Group, Code, Stack, Grid, SegmentedControl, Button, TextInput, Text } from '@mantine/core';
import {
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconDatabaseImport,
  IconReceipt2,
  IconSwitchHorizontal,
  IconLogout,
  IconHome,
  IconClipboardList,
  IconCheckupList,
  IconArrowLeft,
  IconTruckDelivery,
  IconLogin,
  IconLogin2,
} from '@tabler/icons-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { modals } from '@mantine/modals';
import { ProfileButton } from './ProfileButton';
import classes from './Navbar.module.css';

const navLinks = {
  client: [
    { link: '/', label: 'Pagrindinis', icon: IconHome },
    { link: '/orders', label: 'Rezervacijos', icon: IconClipboardList },
  ],
  merchant: [
    { link: '/dashboard/home', label: 'Pagrindinis', icon: IconHome },
    { link: '/dashboard/inventory', label: 'Inventorius', icon: IconClipboardList },
    { link: '/dashboard/listings', label: 'Skelbimai', icon: IconCheckupList },
    { link: '/dashboard/orders', label: 'Užsakymai', icon: IconTruckDelivery },
  ],
};

export function Navbar() {
  const [role, setRole] = useState<string>('client');
  const [active, setActive] = useState('Billing');
  const isAuthenticaded = useIsAuthenticated();
  const navigate = useNavigate();
  const signOut = useSignOut();

  const links = navLinks[role as keyof typeof navLinks].map((item) => (
    <NavLink
      className={({ isActive }) => [isActive ? classes.active : '', classes.link].join(' ')}
      to={item.link}
      key={item.label}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </NavLink>
  ));

  const signOutAction = () => {
    setRole('client');
    signOut();
    navigate('/');
    modals.open({
      centered: true,
      title: 'Log out',
      children: (
        <>
          <Text>You were successfuly logged out from your account! You may close this dialog</Text>
          <Button fullWidth onClick={() => modals.closeAll()} mt="md">
            Close
          </Button>
        </>
      ),
    });
  };

  const changeRole = (role: string) => {
    setRole(role);
    if (role === 'client') {
      navigate('/');
    } else if (role === 'merchant') {
      navigate('/dashboard/home');
    }
  };

  return (
    <Stack h="100%">
      <div className={classes.navbarMain}>{links}</div>

      <div className={classes.footer}>
        {isAuthenticaded() ? (
          <>
            <SegmentedControl
              data={[
                { label: 'Klientas', value: 'client' },
                { label: 'Nuomininkas', value: 'merchant' },
              ]}
              fullWidth
              onChange={changeRole}
            />
            <ProfileButton />
            <NavLink to="/logout" className={classes.link} onClick={signOutAction}>
              <IconLogout className={classes.linkIcon} stroke={1.5} />
              <span>Atsijungti</span>
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/login" className={classes.link}>
              <IconLogin className={classes.linkIcon} stroke={1.5} />
              <span>Prisijungti</span>
            </NavLink>

            <NavLink to="/register" className={classes.link}>
              <IconFingerprint className={classes.linkIcon} stroke={1.5} />
              <span>Registruotis</span>
            </NavLink>
          </>
        )}
      </div>
    </Stack>
  );
}
