import { Box, Button, Center, Grid, Text } from '@mantine/core';
import { IconLogin } from '@tabler/icons-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function LoginRequired() {
  const navigate = useNavigate();

  return (
    <Box>
      <Grid justify="">
        <Grid.Col>
          <Center>
            <IconLogin size={80} stroke={1} />
          </Center>
        </Grid.Col>
        <Grid.Col>
          <Center>
            <Text>Prašome prisijungti norėdami atlikti tolimesnius veiksmus</Text>
          </Center>
        </Grid.Col>
        <Grid.Col>
          <Center>
            <Button onClick={() => navigate('/login')}>Prisijungti</Button>
          </Center>
        </Grid.Col>
      </Grid>
    </Box>
  );
}

export default LoginRequired;
