import cx from 'clsx';
import { useState } from 'react';
import {
  Container,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Tabs,
  Burger,
  rem,
  useMantineTheme,
  Button,
  TextInput,
  ActionIcon,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconLogout,
  IconHeart,
  IconStar,
  IconMessage,
  IconSettings,
  IconPlayerPause,
  IconTrash,
  IconSwitchHorizontal,
  IconChevronDown,
  IconHome,
  IconPlus,
  IconBuildingWarehouse,
  IconSearch,
  IconTruckDelivery,
  IconBell,
  IconBellFilled,
} from '@tabler/icons-react';
import Logo from '@/assets/images/logo.png';
import classes from './Header.module.css';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { Link, useNavigate } from 'react-router-dom';
import ThemeButton from '../../ThemeButton';
import Search from './Search';
import Notifications from '@/components/Misc/Notifications';

const user = {
  name: 'Jane Spoonfighter',
  email: 'janspoon@fighter.dev',
  image: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png',
};

const tabs = [
  {
    label: 'Home',
    link: '/',
  },
  {
    label: 'Orders',
    link: '/orders',
  },
];

export function Header() {
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const isAuthenticated = useIsAuthenticated();
  const auth: AuthUser | null = useAuthUser();
  const signOut = useSignOut();

  const items = tabs.map((tab) => (
    <Tabs.Tab value={tab.label} key={tab.label} onClick={() => navigate(tab.link || '/')}>
      {tab.label}
    </Tabs.Tab>
  ));
  const signOutAction = () => {
    signOut();
    navigate('/');
  };

  return (
    <div className={classes.header}>
      <Container className={classes.mainSection} size="md">
        <Group justify="space-between">
          <Link to="/">
            <img src={Logo} alt="logo" width={120} />
          </Link>

          <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />

          <Search />

          {isAuthenticated() ? (
            <Group>
              <Notifications />
              <Menu
                width={260}
                position="bottom-end"
                transitionProps={{ transition: 'pop-top-right' }}
                onClose={() => setUserMenuOpened(false)}
                onOpen={() => setUserMenuOpened(true)}
                withinPortal
              >
                <Menu.Target>
                  <UnstyledButton
                    className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
                  >
                    <Group gap={7}>
                      <Avatar alt={auth?.username} radius="xl" color="cyan" size={20}>
                        {auth?.username[0].toUpperCase()}
                      </Avatar>
                      <Text fw={500} size="sm" lh={1} mr={3}>
                        {auth?.username}
                      </Text>
                      <IconChevronDown style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                    </Group>
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label>Dashboard</Menu.Label>
                  <Menu.Item
                    leftSection={
                      <IconHome style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    }
                    onClick={() => navigate('/dashboard')}
                  >
                    Home
                  </Menu.Item>
                  <Menu.Item
                    leftSection={
                      <IconBuildingWarehouse
                        style={{ width: rem(16), height: rem(16) }}
                        stroke={1.5}
                      />
                    }
                    onClick={() => navigate('/dashboard/inventory')}
                  >
                    Inventory items
                  </Menu.Item>

                  <Menu.Item
                    leftSection={
                      <IconBuildingWarehouse
                        style={{ width: rem(16), height: rem(16) }}
                        stroke={1.5}
                      />
                    }
                    onClick={() => navigate('/dashboard/listings')}
                  >
                    Rent listings
                  </Menu.Item>

                  <Menu.Item
                    leftSection={
                      <IconTruckDelivery style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    }
                    onClick={() => navigate('/dashboard/orders')}
                  >
                    Orders
                  </Menu.Item>

                  <Menu.Label>Settings</Menu.Label>
                  <Menu.Item
                    leftSection={
                      <IconSettings style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    }
                  >
                    Account settings
                  </Menu.Item>
                  <Menu.Item
                    leftSection={
                      <IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    }
                    onClick={signOutAction}
                  >
                    Sign out
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          ) : (
            <Group justify="center" grow>
              <Button variant="default" onClick={() => navigate('/login')}>
                Log in
              </Button>
              <Button onClick={() => navigate('/register')}>Sign up</Button>
            </Group>
          )}
        </Group>
      </Container>
      <Container size="md">
        <Tabs
          defaultValue="Home"
          variant="outline"
          visibleFrom="sm"
          classNames={{
            root: classes.tabs,
            list: classes.tabsList,
            tab: classes.tab,
          }}
        >
          <Tabs.List>
            {items}
            <ThemeButton />
          </Tabs.List>
        </Tabs>
      </Container>
    </div>
  );
}
