import { RegisterForm } from '@/components/Forms/RegisterForm/RegisterForm';
import { Box, Center } from '@mantine/core';
import React from 'react';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  if (isAuthenticated()) {
    navigate('/');
    return <></>;
  }
  return (
    <Center h={'100vh'}>
      <RegisterForm />
    </Center>
  );
}
