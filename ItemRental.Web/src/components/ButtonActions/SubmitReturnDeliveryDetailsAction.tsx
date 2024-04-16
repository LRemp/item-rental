import { Button, Center } from '@mantine/core';
import { IconBoxSeam, IconPlaylistAdd } from '@tabler/icons-react';
import React, { useEffect } from 'react';
import CreateListingModal from '../Modals/CreateListing';
import { useDisclosure } from '@mantine/hooks';
import SubmitDeliveryDetailsModal from '../Modals/SubmitDeliveryDetails';
import SubmitReturnDeliveryDetailsModal from '../Modals/SubmitReturnDeliveryDetails';

interface SubmitReturnDeliveryDetailsActionProps extends ItemButtonActionProps {
  deliveryType: number;
}

const SubmitReturnDeliveryDetailsAction: React.FC<SubmitReturnDeliveryDetailsActionProps> = ({
  id,
  deliveryType,
}) => {
  const [opened, { close, open }] = useDisclosure(false);

  return (
    <>
      <SubmitReturnDeliveryDetailsModal
        id={id}
        opened={opened}
        close={close}
        deliveryType={deliveryType}
      />
      <Button fullWidth onClick={open}>
        <Center inline>
          Submit return delivery details <IconBoxSeam size={26} stroke={1.5} />
        </Center>
      </Button>
    </>
  );
};

export default SubmitReturnDeliveryDetailsAction;
