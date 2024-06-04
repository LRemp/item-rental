import { Avatar, Badge, Box, Group, Paper, Text } from '@mantine/core';

const ClientCard: React.FC<UserProfile> = ({ id, username, name, surname, email, verified }) => {
  return (
    <Paper p="lg" shadow="md" radius="sm">
      <Group>
        <Avatar radius="sm" size={'xl'} color="blue">
          {username[0].toUpperCase()}
        </Avatar>
        <Box>
          <Text fw={600}>
            {name} {surname}
          </Text>
          <Text size="sm" c={'dimmed'}>
            ({username})
          </Text>
          <Text size="sm" fw={600}>
            +37067600484
          </Text>
          <Text size="xs" c={'dimmed'}>
            {email}
          </Text>
          {verified && <Badge size="xs">Patvirtintas</Badge>}
        </Box>
      </Group>
    </Paper>
  );
};

export default ClientCard;
