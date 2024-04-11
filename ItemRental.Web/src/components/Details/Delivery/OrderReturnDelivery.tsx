import api from '@/api';
import useApiResult from '@/hooks/useApiResult';
import { Button, Center } from '@mantine/core';
import { IconBoxSeam } from '@tabler/icons-react';
import React from 'react';

interface OrderReturnDeliveryProps {
  id: string;
}

const OrderReturnDelivery: React.FC<OrderReturnDeliveryProps> = ({ id }) => {
  const { result: delivery, loading } = useApiResult(() => api.Delivery.get(id || ''), []);

  return (
    <>
      <Button fullWidth>
        <Center inline>
          Submit return delivery details <IconBoxSeam size={26} stroke={1.5} />
        </Center>
      </Button>
    </>
  );
};

export default OrderReturnDelivery;
