import { LoginForm } from '@/components/Forms/LoginForm/LoginForm';
import { Box, Center } from '@mantine/core';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  if (isAuthenticated()) {
    navigate('/');
    return <></>;
  }
  return (
    <Center h={'100vh'}>
      <LoginForm />
    </Center>
  );
}
