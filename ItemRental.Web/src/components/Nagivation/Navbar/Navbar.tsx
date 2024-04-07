import { useState } from 'react';
import { Group, Code, Stack } from '@mantine/core';
import {
  IconBellRinging,
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
} from '@tabler/icons-react';
import classes from './Navbar.module.css';
import { Link, NavLink } from 'react-router-dom';

const data = [
  { link: '/dashboard/home', label: 'Home', icon: IconHome },
  { link: '/dashboard/inventory', label: 'Inventory', icon: IconClipboardList },
  { link: '/dashboard/listings', label: 'Listings', icon: IconCheckupList },
];

export function Navbar() {
  const [active, setActive] = useState('Billing');

  const links = data.map((item) => (
    <NavLink
      className={({ isActive }) => [isActive ? classes.active : '', classes.link].join(' ')}
      to={item.link}
      key={item.label}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </NavLink>
  ));

  return (
    <Stack h={'100%'}>
      <div className={classes.navbarMain}>{links}</div>

      <div className={classes.footer}>
        <NavLink to="/" className={classes.link}>
          <IconArrowLeft className={classes.linkIcon} stroke={1.5} />
          <span>Exit dashboard</span>
        </NavLink>

        <NavLink to="/logout" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </NavLink>
      </div>
    </Stack>
  );
}
