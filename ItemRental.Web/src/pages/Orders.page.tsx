import api from '@/api';
import OrderCard from '@/components/Cards/OrderCard';
import UserOrdersTable from '@/components/Tables/UserOrdersTable';
import useApiResult from '@/hooks/useApiResult';
import { Box, Center, Grid, Group, Loader, Text, Title } from '@mantine/core';
import React, { useEffect } from 'react';
import { nprogress } from '@mantine/nprogress';

function Orders() {
  return (
    <>
      <OrdersListContainer />
    </>
  );
}

export default Orders;

const OrdersListContainer = () => {
  const { result: orders, loading } = useApiResult(() => api.Order.getUserOrders(), []);

  useEffect(() => {
    if (loading) {
      nprogress.start();
    } else {
      nprogress.complete();
    }
  }, [loading]);

  return (
    <>
      {loading ? (
        <Center h={'70vh'} w={'100%'}>
          <Group>
            <Loader></Loader>
            <Text>Loading up your orders...</Text>
          </Group>
        </Center>
      ) : (
        <Box>
          <Title my={'lg'} order={2} fw={400}>
            Your orders
          </Title>
          <UserOrdersTable items={orders} />
        </Box>
      )}
    </>
  );
};
