import User from '@/api/User';
import { Stack, Avatar, Text } from '@mantine/core';
import React from 'react';

const UserDetailsCard: React.FC<UserProfile> = ({ name, surname, username, email }) => {
  return (
    <Stack align="center" gap={0}>
      <Avatar size={100} />
      <Text fw={500} size="xl">
        {name} {surname}
      </Text>
      <Text c="dimmed" size="sm">
        {email}
      </Text>
    </Stack>
  );
};

export default UserDetailsCard;
