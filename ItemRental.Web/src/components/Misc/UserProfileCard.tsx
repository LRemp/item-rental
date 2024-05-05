import { Avatar, Text, Button, Paper, Grid } from '@mantine/core';
import { IconDiscountCheckFilled } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

const UserProfileCard: React.FC<UserProfile> = ({ id, username, name, surname }) => {
  const navigate = useNavigate();
  return (
    <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)" shadow="sm">
      <Grid columns={12}>
        <Grid.Col span={3}>
          <Avatar color="cyan" radius="xl" size="lg" variant="filled">
            {username[0].toUpperCase()}
          </Avatar>
        </Grid.Col>
        <Grid.Col span={9}>
          <Text ta="center" fw={500}>
            {username} <IconDiscountCheckFilled size="18" />
          </Text>
          <Button
            variant="default"
            size="compact-xs"
            fullWidth
            onClick={() => navigate(`/user/${id}`)}
          >
            View profile
          </Button>
        </Grid.Col>
      </Grid>
    </Paper>
  );
};

export default UserProfileCard;
