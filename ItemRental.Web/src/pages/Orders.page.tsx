import api from '@/api';
import OrderCard from '@/components/Cards/OrderCard';
import UserOrdersTable from '@/components/Tables/UserOrdersTable';
import useApiResult from '@/hooks/useApiResult';
import { Center, Grid, Group, Loader, Text } from '@mantine/core';
import React from 'react';

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
        <UserOrdersTable items={orders} />
      )}
    </>
  );
};
