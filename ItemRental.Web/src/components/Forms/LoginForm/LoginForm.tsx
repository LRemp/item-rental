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
} from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { useForm } from '@mantine/form';
import Logo from '@/assets/images/logo.png';
import classes from './LoginForm.module.css';
import api from '@/api';
import { Error, Success } from '@/utils/Notifications';

export function LoginForm() {
  const navigate = useNavigate();
  const signIn = useSignIn();

  const form = useForm({
    initialValues: {
      email: 'rent@itemrental.com',
      password: 'rent',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const login = async (args: any) => {
    const notificationId = notifications.show({
      loading: true,
      title: 'Loading',
      message: 'Logging in...',
      autoClose: false,
      withCloseButton: false,
    });

    const request = await fetch(api.User.Login.path, {
      method: 'POST',
      body: JSON.stringify({
        email: args.email,
        password: args.password,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    const { status } = request;

    if (status == 400) {
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

    const data: LoginResponse = await request.json();

    if (!data.token) {
      return notifications.update(
        Error({
          id: notificationId,
          title: 'Error',
          message: 'Something went wrong... Try again',
          autoClose: 2000,
        })
      );
    }

    signIn({
      auth: {
        token: data.token,
        type: 'Bearer',
      },
      //refresh: 'ey....mA',
      userState: data.user,
    });

    notifications.update(
      Success({
        id: notificationId,
        title: 'Success',
        message: 'Logged in successfully!',
        autoClose: 4000,
      })
    );

    navigate('/');
  };

  return (
    <Container size={420} my={40}>
      <img src={Logo} alt="logo" width={80} className="" />
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor size="sm" component="button">
          <Link to="/register">Create account</Link>
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit((values) => login(values))}>
          <TextInput
            label="Email"
            placeholder="you@mantine.dev"
            required
            {...form.getInputProps('email')}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            {...form.getInputProps('password')}
          />
          <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl" type="submit">
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
