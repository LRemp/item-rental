import api from '@/api';
import UserDetailsCard from '@/components/Cards/UserDetailsCard';
import UserProfileDetails from '@/components/Misc/UserProfileDetails';
import useApiResult from '@/hooks/useApiResult';
import { Avatar, Center, Grid, Loader, Paper, Stack, Text, Title } from '@mantine/core';
import React from 'react';
import { useParams } from 'react-router-dom';

function User() {
  const { id } = useParams();
  const { result: user, loading } = useApiResult(() => api.User.get(id || ''), []);
  console.log(user);
  return (
    <Grid columns={18}>
      {loading ? (
        <Loader />
      ) : user != null ? (
        <Profile id={id} user={user} />
      ) : (
        <Center>
          <Text fs="italic" c="dimmed">
            User not found
          </Text>
        </Center>
      )}
    </Grid>
  );
}

export default User;

interface ProfileProps {
  user: UserProfile;
  id: string | undefined;
}

const Profile: React.FC<ProfileProps> = ({ user, id }) => {
  return (
    <>
      <Grid.Col span={{ base: 18, md: 4 }}>
        <Paper shadow="md" radius={'sm'} p={'md'}>
          <UserDetailsCard {...user} />
        </Paper>
      </Grid.Col>
      <Grid.Col span={{ base: 18, md: 14 }}>
        <Paper shadow="md" radius={'sm'} p={'md'}>
          <UserProfileDetails id={user.id} />
        </Paper>
      </Grid.Col>
    </>
  );
};
