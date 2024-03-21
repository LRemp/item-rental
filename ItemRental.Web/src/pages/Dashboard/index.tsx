import { Navbar } from '@/components/Nagivation/Navbar/Navbar';
import { Flex } from '@mantine/core';
import React from 'react';
import { Outlet } from 'react-router-dom';

import {
  IconHome2,
  IconGauge,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconCalendarStats,
  IconUser,
  IconSettings,
  IconLogout,
  IconSwitchHorizontal,
} from '@tabler/icons-react';

export default function Dashboard() {
  return (
    <Flex>
      <Navbar
        navlinks={[
          { icon: IconHome2, label: 'Home', path: '' },
          { icon: IconGauge, label: 'Inventory', path: 'inventory' },
          { icon: IconGauge, label: 'Listings', path: 'listings' },
          { icon: IconSettings, label: 'Settings', path: 'settings' },
        ]}
      />
      <Outlet />
    </Flex>
  );
}
