import { Button } from '@mantine/core';
import { IconPlaylistAdd } from '@tabler/icons-react';
import React from 'react';
import CreateListingModal from '../Modals/CreateListing';
import { useDisclosure } from '@mantine/hooks';

const CreateListingAction: React.FC<FlexibleButtonActionProps> = ({ id }) => {
    const [opened, { close, open }] = useDisclosure(false);

    const openModal = () => open();

    return (
        <>
            <CreateListingModal id={id} opened={opened} close={close} />
            <Button onClick={openModal}>Create Listing <IconPlaylistAdd size={18} /></Button>
        </>
    )
}

export default CreateListingAction;