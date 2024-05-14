import { Box, Button, Center, Flex, Grid, Group, Loader, Paper, Title } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import React from 'react';
import { Link } from 'react-router-dom';
import api from '@/api';
import { StatsGrid } from '@/components/Misc/Stats';
import OrdersTable from '@/components/Tables/OrdersTable';
import useApiResult from '@/hooks/useApiResult';
import RequireAuthRoute from '@/layouts/RequireAuthRoute';

const ActiveOrders: React.FC = () => {
  const { result: orders, loading } = useApiResult(() => api.Order.getOwnerOrders(3), []);
  return (
    <Paper shadow="md" radius="sm" p="md" h={300}>
      <Group justify="space-between">
        <Title fw={500} order={4}>
          Aktyvios nuomos
        </Title>
        <Link to="/dashboard/orders">
          <Button color="orange">
            <Center inline>
              Peržiūrėti užsakymus <IconArrowRight size={18} />
            </Center>
          </Button>
        </Link>
      </Group>
      {loading ? (
        <Flex h="90%" w="100%" justify="center" align="center">
          <Loader />
        </Flex>
      ) : (
        <OrdersTable orders={orders} />
      )}
    </Paper>
  );
};

const PendingOrders: React.FC = () => {
  const { result: orders, loading } = useApiResult(() => api.Order.getOwnerOrders(0), []);
  return (
    <Paper shadow="md" radius="sm" p="md" h={300}>
      <Group justify="space-between">
        <Title fw={500} order={4}>
          Nuomos rezervacijos
        </Title>
        <Link to="/dashboard/orders">
          <Button color="yellow">
            <Center inline>
              Peržiūrėti rezervacijas <IconArrowRight size={18} />
            </Center>
          </Button>
        </Link>
      </Group>
      {loading ? (
        <Flex h="90%" w="100%" justify="center" align="center">
          <Loader />
        </Flex>
      ) : (
        <OrdersTable orders={orders} type="pending" />
      )}
    </Paper>
  );
};

const CompletedOrders: React.FC = () => {
  const { result: orders, loading, request } = useApiResult(() => api.Order.getOwnerOrders(5), []);
  return (
    <Paper shadow="md" radius="sm" p="md" h={300}>
      <Group justify="space-between">
        <Title fw={500} order={4}>
          Įvykdyti užsakymai
        </Title>
        <Link to="/dashboard/orders">
          <Button color="green">
            <Center inline>
              Peržiūrėti užsakymus <IconArrowRight size={18} />
            </Center>
          </Button>
        </Link>
      </Group>
      {loading ? (
        <Flex h="90%" w="100%" justify="center" align="center">
          <Loader />
        </Flex>
      ) : (
        <OrdersTable orders={orders} refresh={() => request()} />
      )}
    </Paper>
  );
};

export default function Home() {
  return (
    <RequireAuthRoute fallbackPath="/login">
      <Box w="100%">
        <Grid columns={24} grow>
          <Grid.Col span={24}>
            <Title fw={600}>Pagrindinis</Title>
          </Grid.Col>
          <Grid.Col span={24}>
            <StatsGrid />
          </Grid.Col>
          <Grid.Col span={8}>
            <ActiveOrders />
          </Grid.Col>
          <Grid.Col span={8}>
            <PendingOrders />
          </Grid.Col>
          <Grid.Col span={8}>
            <CompletedOrders />
          </Grid.Col>
        </Grid>
      </Box>
    </RequireAuthRoute>
  );
}
