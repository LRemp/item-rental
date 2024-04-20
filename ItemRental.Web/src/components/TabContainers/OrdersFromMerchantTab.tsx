import api from '@/api';
import useApiResult from '@/hooks/useApiResult';
import { Loader } from '@mantine/core';
import React from 'react';
import OrdersTableUpdated from '../Tables/OrdersTableUpdated';

interface OrdersFromMerchantTabProps {
  id: string;
}

const OrdersFromMerchantTab: React.FC<OrdersFromMerchantTabProps> = ({ id }) => {
  const { result, loading } = useApiResult(() => api.User.getMerchantOrders(id), []);
  return <>{loading ? <Loader /> : <OrdersTableUpdated elements={result} />}</>;
};

export default OrdersFromMerchantTab;
