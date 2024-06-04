import { useEffect, useState } from 'react';
import { Stack, SegmentedControl, Button, Text } from '@mantine/core';
import {
  IconFingerprint,
  IconLogout,
  IconHome,
  IconClipboardList,
  IconCheckupList,
  IconTruckDelivery,
  IconLogin,
} from '@tabler/icons-react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
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
  const location = useLocation();
  const { hash, pathname, search } = location;
  const [role, setRole] = useState<string>(pathname.includes('/dashboard') ? 'merchant' : 'client');
  const isAuthenticaded = useIsAuthenticated();
  const navigate = useNavigate();
  const signOut = useSignOut();

  const links = navLinks[role as keyof typeof navLinks].map((item) => (
    <NavLink
      id={item.link.toLocaleLowerCase()}
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

  const changeRole = (roleToSet: string) => {
    setRole(roleToSet);
    if (roleToSet === 'client') {
      navigate('/');
    } else if (roleToSet === 'merchant') {
      navigate('/dashboard/home');
    }
  };

  return (
    <Stack h="100%">
      <div className={classes.navbarMain}>{links}</div>

      <div className={classes.footer}>
        {isAuthenticaded ? (
          <>
            <SegmentedControl
              value={role}
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
            <NavLink id="login" to="/login" className={classes.link}>
              <IconLogin className={classes.linkIcon} stroke={1.5} />
              <span>Prisijungti</span>
            </NavLink>

            <NavLink id="register" to="/register" className={classes.link}>
              <IconFingerprint className={classes.linkIcon} stroke={1.5} />
              <span>Registruotis</span>
            </NavLink>
          </>
        )}
      </div>
    </Stack>
  );
}
