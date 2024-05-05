import { Container } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { Header } from '@/components/Nagivation/Header';

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
