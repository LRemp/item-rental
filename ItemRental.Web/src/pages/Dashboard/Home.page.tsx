import api from '@/api';
import { StatsGrid } from '@/components/Misc/Stats';
import { Navbar } from '@/components/Nagivation/Navbar';
import OrdersTable from '@/components/Tables/OrdersTable';
import useApiResult from '@/hooks/useApiResult';
import {
  Anchor,
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Group,
  Loader,
  Paper,
  Text,
  Title,
} from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import React from 'react';

export default function Home() {
  return (
    <Box w={'100%'}>
      <Grid columns={24} grow>
        <Grid.Col span={24}>
          <Title fw={400} order={2}>
            Dashboard
          </Title>
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
  );
}

const ActiveOrders: React.FC = () => {
  const { result: orders, error, loading } = useApiResult(() => api.Order.getOwnerOrders(3), []);
  return (
    <Paper shadow="sm" withBorder p={'md'} h={300}>
      <Group justify="space-between">
        <Text size="sm" fw={600}>
          Active rents
        </Text>
        <Button variant="subtle">
          <Center inline>
            Open acitve rents <IconArrowRight size={18} />
          </Center>
        </Button>
      </Group>
      {loading ? (
        <Flex h={'90%'} w={'100%'} justify={'center'} align={'center'}>
          <Loader />
        </Flex>
      ) : (
        <OrdersTable orders={orders} />
      )}
    </Paper>
  );
};

const PendingOrders: React.FC = () => {
  const { result: orders, error, loading } = useApiResult(() => api.Order.getOwnerOrders(0), []);
  return (
    <Paper shadow="sm" withBorder p={'md'} h={300}>
      <Group justify="space-between">
        <Text size="sm" fw={600}>
          Pending rent requests
        </Text>
        <Button variant="subtle">
          <Center inline>
            Open acitve rents <IconArrowRight size={18} />
          </Center>
        </Button>
      </Group>
      {loading ? (
        <Flex h={'90%'} w={'100%'} justify={'center'} align={'center'}>
          <Loader />
        </Flex>
      ) : (
        <OrdersTable orders={orders} type={'pending'} />
      )}
    </Paper>
  );
};

const CompletedOrders: React.FC = () => {
  const {
    result: orders,
    error,
    loading,
    request,
  } = useApiResult(() => api.Order.getOwnerOrders(5), []);
  return (
    <Paper shadow="sm" withBorder p={'md'} h={300}>
      <Group justify="space-between">
        <Text size="sm" fw={600}>
          Completed rents
        </Text>
        <Button variant="subtle">
          <Center inline>
            Open completed rents <IconArrowRight size={18} />
          </Center>
        </Button>
      </Group>
      {loading ? (
        <Flex h={'90%'} w={'100%'} justify={'center'} align={'center'}>
          <Loader />
        </Flex>
      ) : (
        <OrdersTable orders={orders} refresh={() => request()} />
      )}
    </Paper>
  );
};
