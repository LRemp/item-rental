import api from '@/api';
import DashboardOrdersTable from '@/components/Tables/Dashboard/OrdersTable';
import useApiResult from '@/hooks/useApiResult';
import {
  Anchor,
  Box,
  Breadcrumbs,
  Button,
  Center,
  Grid,
  Loader,
  Paper,
  Title,
} from '@mantine/core';
import React, { useEffect } from 'react';
import { nprogress } from '@mantine/nprogress';

const pathItems = [{ title: 'Dashboard', href: '/dashboard' }, { title: 'Orders' }].map(
  (item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  )
);

function Orders() {
  const { result: orders, loading } = useApiResult(() => api.Order.getOwnerOrders(), []);

  useEffect(() => {
    if (loading) {
      nprogress.start();
    } else {
      nprogress.complete();
    }
  }, [loading]);
  console.log(orders);

  return (
    <Box w={'100%'}>
      <Grid columns={24} grow>
        <Grid.Col span={24}>
          <Grid justify="space-between" align="flex-end">
            <Grid.Col span={1}>
              <Title fw={400} order={2}>
                Orders
              </Title>
              <Breadcrumbs mt={'xs'}>{pathItems}</Breadcrumbs>
            </Grid.Col>
          </Grid>
          <Box></Box>
        </Grid.Col>
        <Grid.Col span={24}>
          <Paper>
            {loading ? (
              <Center>
                <Loader />
              </Center>
            ) : (
              <DashboardOrdersTable items={orders} />
            )}
          </Paper>
        </Grid.Col>
      </Grid>
    </Box>
  );
}

export default Orders;
