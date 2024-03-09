import { Navbar } from '@/components/Navbar/Navbar';
import { Anchor, Box, Button, Flex, Grid, Group, Paper, Text, Title } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import React from 'react';

export default function Home() {
  return (
    <Box m={'lg'} w={'100%'}>
      <Grid columns={24} grow>
        <Grid.Col span={14}>
          <Paper shadow="md" p={'md'}>
            <Group justify="space-between">
              <Title order={5}>Active rents</Title>
              <Button variant="subtle">
                Open acitve rents <IconArrowRight />
              </Button>
            </Group>
          </Paper>
        </Grid.Col>
        <Grid.Col span={10}>
          <Paper shadow="md" p={'md'}>
            <Group justify="space-between">
              <Title order={5}>Rent requests</Title>
              <Button variant="subtle">
                Open rent requests <IconArrowRight />
              </Button>
            </Group>
          </Paper>
        </Grid.Col>
      </Grid>
    </Box>
  );
}
