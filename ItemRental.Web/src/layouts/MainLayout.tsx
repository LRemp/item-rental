import { Container, Flex, Group } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { Header } from '@/components/Nagivation/Header';

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
