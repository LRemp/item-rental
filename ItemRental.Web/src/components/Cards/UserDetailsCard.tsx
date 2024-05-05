import { Stack, Avatar, Text, Badge } from '@mantine/core';
import React from 'react';

const UserDetailsCard: React.FC<UserProfile> = ({ name, surname, email, verified }) => (
  <Stack align="center" gap={0}>
    <Avatar size={100} />
    <Text fw={500} size="xl">
      {name} {surname}
    </Text>
    {verified && <Badge>Verified</Badge>}
    <Text c="dimmed" size="sm">
      {email}
    </Text>
  </Stack>
);

export default UserDetailsCard;
