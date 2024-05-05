import { Blockquote, Box } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import React from 'react';
import { deliveryStatusTips } from '@/utils/Delivery';

interface OrderStatusHintsProps {
  status: number;
}

const OrderStatusHints: React.FC<OrderStatusHintsProps> = ({ status }) => (
    <Box mt="lg">
      <br />
      {deliveryStatusTips[status] && (
        <Blockquote icon={<IconInfoCircle />}>{deliveryStatusTips[status].text}</Blockquote>
      )}
    </Box>
  );

export default OrderStatusHints;
