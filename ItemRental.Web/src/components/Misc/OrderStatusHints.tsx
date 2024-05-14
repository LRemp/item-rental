import { Alert, Blockquote, Box } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import React from 'react';
import { deliveryStatusTips } from '@/utils/Delivery';

interface OrderStatusHintsProps {
  status: number;
}

const OrderStatusHints: React.FC<OrderStatusHintsProps> = ({ status }) => (
  <Box>
    <br />
    {deliveryStatusTips[status] && (
      <Alert variant="light" color="blue" icon={<IconInfoCircle />}>
        {deliveryStatusTips[status].text}
      </Alert>
    )}
  </Box>
);

export default OrderStatusHints;
