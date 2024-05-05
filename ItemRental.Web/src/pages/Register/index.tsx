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
import { IconAt, IconLock, IconUser } from '@tabler/icons-react';
import Logo from '@/assets/images/logo.png';
import classes from './Components/Form.module.css';
import api from '@/api';
import { Error, Success } from '@/utils/Notifications';
import PasswordStrength from './Components/PasswordStrength';

export function Register() {
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      username: '',
      email: '',
      password: '',
      passwordRepeat: '',
      termsOfService: false,
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
          Create an account
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Do you already have an account{' '}
          <Anchor size="sm" component="button">
            <Link to="/login">Sign in</Link>
          </Anchor>
        </Text>

        <Paper shadow="md" p={16} mt={30} miw={400} radius="sm">
          <form onSubmit={form.onSubmit((values) => register(values))}>
            <Flex gap={14}>
              <TextInput
                label="Name"
                placeholder="Your name"
                required
                {...form.getInputProps('name')}
              />
              <TextInput
                label="Surname"
                placeholder="Your surname"
                required
                {...form.getInputProps('surname')}
              />
            </Flex>
            <TextInput
              leftSectionPointerEvents="none"
              leftSection={<IconUser style={{ width: rem(16), height: rem(16) }} />}
              label="Username"
              placeholder="Your username"
              required
              {...form.getInputProps('username')}
            />
            <TextInput
              leftSectionPointerEvents="none"
              leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
              label="Email"
              placeholder="Your email address"
              required
              {...form.getInputProps('email')}
            />

            <PasswordStrength formHandle={form.getInputProps('password')} />

            <PasswordInput
              leftSectionPointerEvents="none"
              leftSection={<IconLock style={{ width: rem(16), height: rem(16) }} />}
              label="Repeat password"
              placeholder="Repeat your password"
              required
              {...form.getInputProps('passwordRepeat')}
            />

            <Group justify="space-between" mt="lg">
              <Checkbox
                label="I agree to platform terms of service"
                required
                {...form.getInputProps('termsOfService', { type: 'checkbox' })}
              />
              <Anchor component="button" size="sm" style={{ display: 'none' }}>
                Forgot password?
              </Anchor>
              <Button type="submit" fullWidth>
                Sign up
              </Button>
            </Group>
          </form>
        </Paper>
      </Container>
    </Center>
  );
}

export default Register;
