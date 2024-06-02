/* eslint-disable consistent-return */
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  rem,
  Flex,
  Center,
} from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconAt, IconLock, IconPhone, IconPhoneCall, IconUser } from '@tabler/icons-react';
import Logo from '@/assets/images/logo.png';
import classes from './Components/Form.module.css';
import api from '@/api';
import { Error, Success } from '@/utils/Notifications';
import PasswordStrength from './Components/PasswordStrength';
import PhoneNumberInput from '@/components/Input/PhoneNumberInput';

export function Register() {
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      username: 'testuser',
      name: 'Test',
      surname: 'User',
      phone: '+37067600222',
      email: 'testuser@itemrental.com',
      password: 'Testuser1!',
      passwordRepeat: 'Testuser1!',
      termsOfService: true,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      passwordRepeat: (value, values) =>
        value === values.password ? null : 'Passwords do not match',
    },
  });

  const register = async (args: any) => {
    const notificationId = notifications.show({
      loading: true,
      title: 'Loading',
      message: 'Logging in...',
      autoClose: false,
      withCloseButton: false,
    });

    const request = await fetch(api.User.Register.path, {
      method: 'POST',
      body: JSON.stringify({
        username: args.username,
        email: args.email,
        password: args.password,
        name: args.name,
        surname: args.surname,
        phone: args.phone,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    const { status } = request;

    if (status === 400) {
      const error: ErrorResponse = await request.json();
      return notifications.update(
        Error({
          id: notificationId,
          title: 'Error',
          message: error.description,
          autoClose: 2000,
        })
      );
    }

    if (status === 500) {
      return notifications.update(
        Error({
          id: notificationId,
          title: 'Error',
          message: 'The service is unavailable at the moment. Please try again later.',
          autoClose: 2000,
        })
      );
    }

    if (status === 200) {
      notifications.update(
        Success({
          id: notificationId,
          title: 'Success',
          message: 'The account was created successfuly!',
          autoClose: 4000,
        })
      );

      navigate('/login');
    }
  };

  return (
    <Center w="100vw" h="100vh">
      <Container size={420} my={40}>
        <img src={Logo} alt="logo" width={80} className="" />
        <Title ta="center" className={classes.title}>
          Sukurti paskyrą
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Ar jau turite paskyrą?{' '}
          <Anchor size="sm" component="button">
            <Link to="/login">Prisijungti</Link>
          </Anchor>
        </Text>

        <Paper shadow="md" p={16} mt={30} miw={400} radius="sm">
          <form onSubmit={form.onSubmit((values) => register(values))}>
            <Flex gap={14}>
              <TextInput
                id="name"
                label="Vardas"
                placeholder="Įveskite vardą"
                required
                {...form.getInputProps('name')}
              />
              <TextInput
                id="surname"
                label="Pavardė"
                placeholder="Įveskite pavardę"
                required
                {...form.getInputProps('surname')}
              />
            </Flex>
            <TextInput
              leftSectionPointerEvents="none"
              leftSection={<IconUser style={{ width: rem(16), height: rem(16) }} />}
              label="Slapyvardis"
              placeholder="Įveskite savo slapyvardį"
              required
              {...form.getInputProps('username')}
            />
            <TextInput
              leftSectionPointerEvents="none"
              leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
              label="El. paštas"
              placeholder="Įveskite el.paštą"
              required
              {...form.getInputProps('email')}
            />

            <TextInput
              leftSectionPointerEvents="none"
              leftSection={<IconPhone style={{ width: rem(16), height: rem(16) }} />}
              label="Telefono numeris"
              placeholder="Įveskite telefono numerį"
              {...form.getInputProps('phone')}
            />

            <PasswordStrength formHandle={form.getInputProps('password')} />

            <PasswordInput
              leftSectionPointerEvents="none"
              leftSection={<IconLock style={{ width: rem(16), height: rem(16) }} />}
              label="Slaptažodis"
              placeholder="Įveskite slaptažodį"
              required
              {...form.getInputProps('passwordRepeat')}
            />

            <Group justify="space-between" mt="lg">
              <Checkbox
                label="Sutinku su taisyklėmis"
                required
                {...form.getInputProps('termsOfService', { type: 'checkbox' })}
              />
              <Button type="submit" fullWidth>
                Sukurti paskyrą
              </Button>
            </Group>
          </form>
        </Paper>
      </Container>
    </Center>
  );
}

export default Register;
