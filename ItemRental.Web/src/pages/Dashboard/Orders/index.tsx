import { Anchor, Box, Breadcrumbs, Center, Grid, Loader, Paper, Title } from '@mantine/core';
import { useEffect } from 'react';
import { nprogress } from '@mantine/nprogress';
import api from '@/api';
import TableContainer from './Components/TableContainer';
import useApiResult from '@/hooks/useApiResult';

const pathItems = [
  { title: 'Pagrindinis', href: '/dashboard/home' },
  { title: 'Nuomos užklausos' },
].map((item, index) => (
  <Anchor href={item.href} key={index}>
    {item.title}
  </Anchor>
));

function Orders() {
  const { result: orders, loading } = useApiResult(() => api.Order.getOwnerOrders(), []);

  useEffect(() => {
    if (loading) {
      nprogress.start();
    } else {
      nprogress.complete();
    }
  }, [loading]);

  return (
    <Box w="100%">
      <Grid columns={24} grow>
        <Grid.Col span={24}>
          <Title fw={700}>Nuomos užklausos</Title>
          <Breadcrumbs mt="xs">{pathItems}</Breadcrumbs>
        </Grid.Col>
        <Grid.Col span={24}>
          <Paper>
            {loading ? (
              <Center>
                <Loader />
              </Center>
            ) : (
              <TableContainer items={orders} />
            )}
          </Paper>
        </Grid.Col>
      </Grid>
    </Box>
  );
}

export default Orders;
