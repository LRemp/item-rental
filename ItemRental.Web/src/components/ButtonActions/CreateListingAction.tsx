import { Button } from '@mantine/core';
import { IconPlaylistAdd } from '@tabler/icons-react';
import React from 'react';
import { useDisclosure } from '@mantine/hooks';
import CreateListingModal from '../Modals/CreateListing';

const CreateListingAction: React.FC<FlexibleButtonActionProps> = ({ id }) => {
  const [opened, { close, open }] = useDisclosure(false);

  const openModal = () => open();

  return (
    <>
      <CreateListingModal id={id} opened={opened} close={close} />
      <Button onClick={openModal}>
        Sukurti skelbimą <IconPlaylistAdd size={18} />
      </Button>
    </>
  );
};

export default CreateListingAction;
