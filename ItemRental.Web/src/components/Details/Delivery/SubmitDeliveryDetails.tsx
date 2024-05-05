import { Button, Center } from '@mantine/core';
import { IconBoxSeam } from '@tabler/icons-react';
import React from 'react';

interface SubmitDeliveryDetailsProps {
  id: string;
}

const SubmitDeliveryDetails: React.FC<SubmitDeliveryDetailsProps> = () => (
  <>
    <Button fullWidth>
      <Center inline>
        Submit return delivery details <IconBoxSeam size={26} stroke={1.5} />
      </Center>
    </Button>
  </>
);

export default SubmitDeliveryDetails;
