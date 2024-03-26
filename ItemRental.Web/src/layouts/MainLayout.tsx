import { Header } from '@/components/Nagivation/Header';
import { Container, Flex, Group } from '@mantine/core';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  /*
    Test the comments
  */
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}
