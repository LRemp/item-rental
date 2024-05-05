import { Button, Fieldset, Modal, NumberInput, TextInput, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconPlaylistAdd } from '@tabler/icons-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Error, Success } from '@/utils/Notifications';
import useApiResult from '@/hooks/useApiResult';
import api from '@/api';

interface CreatListingModalProps {
  id?: string;
  opened: boolean;
  close: any;
}

const CreateListingModal: React.FC<CreatListingModalProps> = ({ id, opened, close }) => {
  const { result, loading, error, request } = useApiResult(api.RentListing.create);
  const form = useForm({
    initialValues: { item: id, title: '', price: null, description: '' },
    validate: {
      title: (value) => (value.length > 0 ? null : 'You must enter the title'),
      price: (value) => (value != null ? null : 'You must enter the price'),
    },
  });
  const navigate = useNavigate();

  const createListing = async (data: any) => {
    const notificationId = notifications.show({
      loading: true,
      title: 'Creating',
      message: 'Creating a rent listing...',
      autoClose: false,
      withCloseButton: false,
    });

    try {
      const response = await request({
        item: id,
        title: data.title,
        description: data.description,
        location: data.location,
        price: data.price,
      });

      notifications.update(
        Success({
          id: notificationId,
          title: 'Success',
          message: 'The listing was created!',
        })
      );

      navigate(`/listing/${response}`);
    } catch (error: any) {
      notifications.update(
        Error({ id: notificationId, title: 'Error', message: error.description })
      );
    }
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Create item rent listing" centered>
        <form onSubmit={form.onSubmit((values) => createListing(values))}>
          <Fieldset disabled={loading} variant="unstyled">
            <TextInput label="Title" placeholder="Title" {...form.getInputProps('title')} />
            <Textarea
              label="Description"
              placeholder="Description"
              autosize
              {...form.getInputProps('description')}
            />
            <TextInput
              label="Item"
              placeholder="Item"
              {...form.getInputProps('item')}
              value={id}
              disabled={id != null}
            />
            <TextInput
              label="Location"
              placeholder="Location"
              {...form.getInputProps('location')}
            />

            <NumberInput
              label="Price for a day"
              placeholder="Price"
              {...form.getInputProps('price')}
            />

            <Button fullWidth mt="md" type="submit" loading={loading}>
              Create rent listing
            </Button>
          </Fieldset>
        </form>
      </Modal>
    </>
  );
};

export default CreateListingModal;
