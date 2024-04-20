import api from '@/api';
import useApiResult from '@/hooks/useApiResult';
import { Loader } from '@mantine/core';
import React from 'react';
import MerchantOrdersTable from '../Tables/MerchantOrdersTable';

interface OrdersFromMerchantTabProps {
  id: string;
}

const OrdersFromMerchantTab: React.FC<OrdersFromMerchantTabProps> = ({ id }) => {
  const { result, loading } = useApiResult(() => api.User.getMerchantOrders(id), []);
  return <>{loading ? <Loader /> : <MerchantOrdersTable elements={result} />}</>;
};

export default OrdersFromMerchantTab;
