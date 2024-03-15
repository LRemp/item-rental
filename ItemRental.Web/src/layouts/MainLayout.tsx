import { Header } from '@/components/Header/Header';
import { Container, Flex, Group } from '@mantine/core';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}
