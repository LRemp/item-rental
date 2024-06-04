import { AppShell, Burger, Group, Image, UnstyledButton } from '@mantine/core';
import { Outlet, useLocation } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import Logo from '@/assets/images/logo.png';
import { Navbar } from '@/components/Nagivation/Navbar';
import Notifications from '@/components/Misc/Notifications';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [opened, { toggle }] = useDisclosure();
  const location = useLocation();
  const { hash, pathname, search } = location;
  const [previousPath, setPreviousPath] = useState(pathname);
  console.log(pathname);
  useEffect(() => {
    if (pathname != previousPath) {
      toggle();
      setPreviousPath(pathname);
    }
  }, [pathname]);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Group justify="space-between" w="100%">
            <Group>
              <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
              <UnstyledButton>
                <Image src={Logo} h="42" />
              </UnstyledButton>
            </Group>
            <Notifications />
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Navbar />
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
