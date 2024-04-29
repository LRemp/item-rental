import { UnstyledButton, Group, Avatar, Text, rem } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import classes from './ProfileButton.module.css';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

export function ProfileButton() {
  const auth: AuthUser | null = useAuthUser();
  console.log(auth);
  return (
    <UnstyledButton className={classes.user}>
      <Group>
        <Avatar alt={auth?.username} radius="xl" color="cyan">
          {auth?.username[0].toUpperCase()}
        </Avatar>

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {auth?.username}
          </Text>

          <Text c="dimmed" size="xs">
            {auth?.email}
          </Text>
        </div>

        <IconChevronRight style={{ width: rem(14), height: rem(14) }} stroke={1.5} />
      </Group>
    </UnstyledButton>
  );
}
