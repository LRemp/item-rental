import { Button, Center } from '@mantine/core';
import { IconBoxSeam } from '@tabler/icons-react';
import React from 'react';

interface OrderReturnDeliveryProps {
  id: string;
}

const SubmitReturnDeliveryDetails: React.FC<OrderReturnDeliveryProps> = () => (
  <>
    <Button fullWidth>
      <Center inline>
        Submit return delivery details <IconBoxSeam size={26} stroke={1.5} />
      </Center>
    </Button>
  </>
);

export default SubmitReturnDeliveryDetails;
