import {
  Button,
  Center,
  Fieldset,
  Loader,
  Modal,
  Select,
  TextInput,
  Textarea,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import React, { useEffect } from 'react';
import { Error, Success } from '@/utils/Notifications';
import { shippingProviders } from '@/utils/Delivery';
import useApiResult from '@/hooks/useApiResult';
import api from '@/api';

interface SubmitReturnDeliveryDetailsModalProps {
  id: string;
  deliveryType: number;
  opened: boolean;
  close: any;
}

const SubmitReturnDeliveryDetailsModal: React.FC<SubmitReturnDeliveryDetailsModalProps> = ({
  id,
  opened,
  close,
  deliveryType,
}) => {
  const { loading, request: requestDelivery } = useApiResult(() => api.Delivery.get(id || ''), []);
  const { request } = useApiResult(api.Delivery.update);
  const form = useForm({
    initialValues: { shippingId: 'CE473405152EE', shippingProvider: '2' },
    validate: {},
  });

  const updateDetails = async (data: any) => {
    const notificationId = notifications.show({
      loading: true,
      title: 'Atnaujinama',
      message: 'Atnaujinama grąžinimo informacija...',
      autoClose: false,
      withCloseButton: false,
    });

    try {
      await request(id, {
        location: data.location,
        shippingId: data.shippingId,
        shippingProvider: data.shippingProvider,
        comment: data.comment,
      });

      close();

      notifications.update(
        Success({
          id: notificationId,
          title: 'Atnaujinta',
          message: 'Pristatymo informacija sėkmingai atnaujinta!',
        })
      );
    } catch (e: any) {
      notifications.update(Error({ id: notificationId, title: 'Error', message: e.description }));
    }
  };

  useEffect(() => {
    if (opened) {
      requestDelivery();
    } else {
      form.reset();
    }
  }, [opened]);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Provide return delivery details" centered>
        {loading ? (
          <Center>
            <Loader />
          </Center>
        ) : (
          <form onSubmit={form.onSubmit((values) => updateDetails(values))}>
            <Fieldset disabled={loading} variant="unstyled">
              {deliveryType === 0 && (
                <>
                  <TextInput
                    label="Vieta"
                    placeholder="Įveskite atsiėmimo vietą"
                    {...form.getInputProps('location')}
                  />
                </>
              )}
              {deliveryType === 1 && (
                <>
                  <Select
                    data={shippingProviders}
                    label="Pristatymo paslauga"
                    placeholder="Pasirinkite pristatymo paslaugą"
                    {...form.getInputProps('shippingProvider')}
                  />

                  <TextInput
                    label="Sekimo ID"
                    placeholder="Įveskite sekimo ID"
                    {...form.getInputProps('shippingId')}
                  />
                  <Textarea
                    label="Komentaras"
                    placeholder="Įveskite komentarą"
                    {...form.getInputProps('comment')}
                    autosize
                  />
                </>
              )}

              <Button fullWidth mt="md" type="submit" loading={loading}>
                Atnaujinti grąžinimo informaciją
              </Button>
            </Fieldset>
          </form>
        )}
      </Modal>
    </>
  );
};

export default SubmitReturnDeliveryDetailsModal;
