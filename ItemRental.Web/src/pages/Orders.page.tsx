import api from '@/api';
import OrderCard from '@/components/Cards/OrderCard';
import UserOrdersTable from '@/components/Tables/UserOrdersTable';
import useApiResult from '@/hooks/useApiResult';
import { Grid } from '@mantine/core';
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
  return <>{loading ? <div>Loading...</div> : <UserOrdersTable items={orders} />}</>;
};
