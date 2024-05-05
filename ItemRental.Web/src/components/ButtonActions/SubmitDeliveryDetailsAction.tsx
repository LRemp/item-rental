import { Button, Center } from '@mantine/core';
import { IconBoxSeam } from '@tabler/icons-react';
import React from 'react';
import { useDisclosure } from '@mantine/hooks';
import SubmitDeliveryDetailsModal from '../Modals/SubmitDeliveryDetails';

interface SubmitDeliveryDetailsActionProps extends ItemButtonActionProps {
  deliveryType: number;
}

const SubmitDeliveryDetailsAction: React.FC<SubmitDeliveryDetailsActionProps> = ({
  id,
  deliveryType,
}) => {
  const [opened, { close, open }] = useDisclosure(false);

  return (
    <>
      <SubmitDeliveryDetailsModal
        id={id}
        opened={opened}
        close={close}
        deliveryType={deliveryType}
      />
      <Button fullWidth onClick={open}>
        <Center inline>
          Submit delivery details <IconBoxSeam size={26} stroke={1.5} />
        </Center>
      </Button>
    </>
  );
};

export default SubmitDeliveryDetailsAction;
