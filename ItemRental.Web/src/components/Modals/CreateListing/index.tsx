import { Button, Fieldset, Modal, NumberInput, TextInput, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
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
  const { loading, request } = useApiResult(api.RentListing.create);
  const form = useForm({
    initialValues: {
      item: id,
      title: 'Demonstracins skelbimas',
      price: 50,
      description: 'Demonstracinis skelbimo aprašymas',
      location: 'Kaunas, Lithuania',
    },
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
      <Modal opened={opened} onClose={close} title="Sukurti daikto nuomos skelbimą" centered>
        <form onSubmit={form.onSubmit((values) => createListing(values))}>
          <Fieldset disabled={loading} variant="unstyled">
            <TextInput
              label="Pavadinimas"
              placeholder="Pavadinimas"
              {...form.getInputProps('title')}
            />
            <Textarea
              label="Aprašymas"
              placeholder="Description"
              autosize
              {...form.getInputProps('description')}
            />
            <TextInput
              label="Daikto ID"
              placeholder="Daikto ID"
              {...form.getInputProps('item')}
              value={id}
              disabled={id != null}
            />
            <TextInput label="Vieta" placeholder="Vieta" {...form.getInputProps('location')} />

            <NumberInput
              label="Kaina dienai"
              placeholder="Kaina"
              {...form.getInputProps('price')}
            />

            <Button fullWidth mt="md" type="submit" loading={loading}>
              Sukurti skelbimą
            </Button>
          </Fieldset>
        </form>
      </Modal>
    </>
  );
};

export default CreateListingModal;
