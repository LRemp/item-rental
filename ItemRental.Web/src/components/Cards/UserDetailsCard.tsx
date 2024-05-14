import { Stack, Avatar, Text, Badge, Button } from '@mantine/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface UserDetailsCardProps extends UserProfile {
  hasButton?: boolean;
}

const UserDetailsCard: React.FC<UserDetailsCardProps> = ({
  name,
  surname,
  email,
  verified,
  username,
  hasButton,
}) => {
  const navigate = useNavigate();
  return (
    <Stack align="center" gap={0}>
      <Avatar size={100} />
      <Text fw={500} size="xl">
        {name} {surname}
      </Text>
      {verified && <Badge>Patvirtintas</Badge>}
      <Text c="dimmed" size="sm">
        {email}
      </Text>
      {hasButton && (
        <Button fullWidth onClick={() => navigate(`/user/${username}`)}>
          Peržiūrėti profilį
        </Button>
      )}
    </Stack>
  );
};

export default UserDetailsCard;
