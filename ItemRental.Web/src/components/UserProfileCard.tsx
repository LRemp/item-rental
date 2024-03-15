import { Avatar, Text, Button, Paper } from '@mantine/core';
import { IconDiscountCheckFilled } from '@tabler/icons-react';

export function UserProfileCard() {
  return (
    <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)" shadow="sm">
      <Avatar
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
        size={120}
        radius={120}
        mx="auto"
      />
      <Text ta="center" fz="lg" fw={500} mt="md">
        Jane Danes <IconDiscountCheckFilled size={'18'} />
      </Text>
      <Text ta="center" c="dimmed" fz="sm">
        jndanes@me.io • Art director
      </Text>

      <Button variant="default" fullWidth mt="md">
        View profile
      </Button>
    </Paper>
  );
}
