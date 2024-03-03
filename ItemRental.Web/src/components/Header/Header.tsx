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
} from '@tabler/icons-react';
import Logo from '../../assets/images/logo.png';
import classes from './Header.module.css';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import { useNavigate } from 'react-router-dom';

const user = {
  name: 'Jane Spoonfighter',
  email: 'janspoon@fighter.dev',
  image: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png',
};

const tabs = [
  'Home',
  'Orders',
  'Education',
  'Community',
  'Forums',
  'Support',
  'Account',
  'Helpdesk',
];

export function Header() {
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const isAuthenticated = useIsAuthenticated();

  const items = tabs.map((tab) => (
    <Tabs.Tab value={tab} key={tab}>
      {tab}
    </Tabs.Tab>
  ));

  const signOut = useSignOut();

  return (
    <div className={classes.header}>
      <Container className={classes.mainSection} size="md">
        <Group justify="space-between">
          <img src={Logo} alt="logo" width={120} />

          <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />

          {isAuthenticated() ? (
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
                    <Avatar src={user.image} alt={user.name} radius="xl" size={20} />
                    <Text fw={500} size="sm" lh={1} mr={3}>
                      {user.name}
                    </Text>
                    <IconChevronDown style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                  </Group>
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  leftSection={
                    <IconHeart
                      style={{ width: rem(16), height: rem(16) }}
                      color={theme.colors.red[6]}
                      stroke={1.5}
                    />
                  }
                >
                  Liked posts
                </Menu.Item>
                <Menu.Item
                  leftSection={
                    <IconStar
                      style={{ width: rem(16), height: rem(16) }}
                      color={theme.colors.yellow[6]}
                      stroke={1.5}
                    />
                  }
                >
                  Saved posts
                </Menu.Item>
                <Menu.Item
                  leftSection={
                    <IconMessage
                      style={{ width: rem(16), height: rem(16) }}
                      color={theme.colors.blue[6]}
                      stroke={1.5}
                    />
                  }
                >
                  Your comments
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
                    <IconSwitchHorizontal
                      style={{ width: rem(16), height: rem(16) }}
                      stroke={1.5}
                    />
                  }
                >
                  Change account
                </Menu.Item>
                <Menu.Item
                  leftSection={
                    <IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                  }
                  onClick={() => signOut()}
                >
                  Sign out
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
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
          <Tabs.List>{items}</Tabs.List>
        </Tabs>
      </Container>
    </div>
  );
}
