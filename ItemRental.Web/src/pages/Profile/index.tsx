import { Button, Center, Grid, Loader, Paper, PasswordInput, Title, rem } from '@mantine/core';
import { IconLock } from '@tabler/icons-react';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { useForm } from '@mantine/form';
import api from '@/api';
import useApiResult from '@/hooks/useApiResult';
import UserDetailsCard from '@/components/Cards/UserDetailsCard';
import PasswordStrength from '../Register/Components/PasswordStrength';

const Profile = () => {
  const auth: AuthUser | null = useAuthUser();
  const { result: profile, loading } = useApiResult(() => api.User.get(auth?.username || ''), []);

  const form = useForm();

  return (
    <Grid columns={16}>
      <Grid.Col span={16}>
        <Title>Profilis</Title>
      </Grid.Col>
      <Grid.Col span={{ base: 16, md: 4 }}>
        <Paper shadow="md" radius="sm" p="md">
          {loading ? (
            <Center>
              <Loader />
            </Center>
          ) : (
            <>
              <UserDetailsCard {...profile} />
              {profile && !profile.verified && (
                <Button fullWidth mt="md">
                  Sukurti profilio verifikavimo užklausą
                </Button>
              )}
            </>
          )}
        </Paper>
      </Grid.Col>
      <Grid.Col span={{ base: 16, md: 8 }}>
        <Title order={3}>Pakeisti slaptažodį</Title>
        <Paper shadow="md" radius="sm" p="md">
          <PasswordInput
            label="Senas slaptažodis"
            placeholder="Įveskite seną slaptažodį"
            leftSectionPointerEvents="none"
            leftSection={<IconLock style={{ width: rem(16), height: rem(16) }} />}
          />
          <PasswordStrength formHandle={form.getInputProps('newpassword')} />
          <PasswordInput
            leftSectionPointerEvents="none"
            leftSection={<IconLock style={{ width: rem(16), height: rem(16) }} />}
            label="Pakartokite naują slaptažodį"
            placeholder="Įveskitę naują slaptažodį dar kartą"
            {...form.getInputProps('newpasswordrepeat')}
          />
          <Button mt="md" fullWidth>
            Pakeisti slaptažodį
          </Button>
        </Paper>
        <Title order={3} mt="lg">
          Atnaujinti vartotojo duomenis
        </Title>
        <Paper shadow="md" radius="sm" p="md">
          <PasswordInput
            label="Senas slaptažodis"
            placeholder="Įveskite seną slaptažodį"
            leftSectionPointerEvents="none"
            leftSection={<IconLock style={{ width: rem(16), height: rem(16) }} />}
          />
          <PasswordStrength formHandle={form.getInputProps('newpassword')} />
          <PasswordInput
            leftSectionPointerEvents="none"
            leftSection={<IconLock style={{ width: rem(16), height: rem(16) }} />}
            label="Pakartokite naują slaptažodį"
            placeholder="Įveskitę naują slaptažodį dar kartą"
            {...form.getInputProps('newpasswordrepeat')}
          />
          <Button mt="md" fullWidth>
            Pakeisti slaptažodį
          </Button>
        </Paper>
      </Grid.Col>
    </Grid>
  );
};

export default Profile;
