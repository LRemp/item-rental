import { Center, Container, Group, Button } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import { IconArrowRight } from '@tabler/icons-react';
import classes from './Header.module.css';
import Logo from '@/assets/images/logo.png';

export function Header() {
  const navigate = useNavigate();

  return (
    <div className={classes.header}>
      <Container className={classes.mainSection} size="md">
        <Group justify="space-between">
          <Center inline>
            <Link to="/">
              <img src={Logo} alt="logo" width={120} />
            </Link>
          </Center>
          <Button variant="light" onClick={() => navigate('/')}>
            <Center>
              Grįžti į pagrindinį puslapį <IconArrowRight />
            </Center>
          </Button>
        </Group>
      </Container>
    </div>
  );
}
