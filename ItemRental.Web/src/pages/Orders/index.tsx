import { Box, Center, Group, Loader, Text, Title } from '@mantine/core';
import React, { useEffect } from 'react';
import { nprogress } from '@mantine/nprogress';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import api from '@/api';
import UserOrdersTable from '@/components/Tables/UserOrdersTable';
import useApiResult from '@/hooks/useApiResult';
import LoginRequired from '@/components/LoginRequired';

const Orders: React.FC = () => {
  const { result: orders, loading } = useApiResult(() => api.Order.getUserOrders(), []);
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (loading) {
      nprogress.start();
    } else {
      nprogress.complete();
    }
  }, [loading]);

  return (
    <>
      <Box>
        <Title fw={700}>Nuomos rezervacijos</Title>
        {isAuthenticated ? (
          <>
            {loading ? (
              <Center h="70vh" w="100%">
                <Group>
                  <Loader />
                  <Text>Kraunami jūsų užsakymai...</Text>
                </Group>
              </Center>
            ) : (
              <UserOrdersTable items={orders} />
            )}
          </>
        ) : (
          <Center mih="70vh">
            <LoginRequired />
          </Center>
        )}
      </Box>
    </>
  );
};

export default Orders;
