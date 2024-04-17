import api from '@/api';
import useApiResult from '@/hooks/useApiResult';
import { shippingProviders } from '@/utils/Delivery';
import { Error, Success } from '@/utils/Notifications';
import {
  Button,
  Center,
  Fieldset,
  Loader,
  Modal,
  NumberInput,
  Select,
  TextInput,
  Textarea,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconPlaylistAdd } from '@tabler/icons-react';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const {
    result: delivery,
    loading,
    request: requestDelivery,
  } = useApiResult(() => api.Delivery.get(id || ''), []);
  const { result, error, request } = useApiResult(api.Delivery.update);
  const form = useForm({
    initialValues: { shippingId: 'CE473405152EE', shippingProvider: '2' },
    validate: {},
  });
  const navigate = useNavigate();

  const updateDetails = async (data: any) => {
    const notificationId = notifications.show({
      loading: true,
      title: 'Updating',
      message: 'Updating return delivery details...',
      autoClose: false,
      withCloseButton: false,
    });

    try {
      const response = await request(id, {
        location: data.location,
        shippingId: data.shippingId,
        shippingProvider: data.shippingProvider,
        comment: data.comment,
      });

      close();

      notifications.update(
        Success({
          id: notificationId,
          title: 'Success',
          message: 'Return delivery details updated successfuly!',
        })
      );
    } catch (error: any) {
      notifications.update(
        Error({ id: notificationId, title: 'Error', message: error.description })
      );
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
      <Modal opened={opened} onClose={close} title={'Provide return delivery details'} centered>
        {loading ? (
          <Center>
            <Loader />
          </Center>
        ) : (
          <form onSubmit={form.onSubmit((values) => updateDetails(values))}>
            <Fieldset disabled={loading} variant="unstyled">
              {deliveryType == 0 && (
                <>
                  <TextInput
                    label="Location"
                    placeholder="Enter pickup location"
                    {...form.getInputProps('location')}
                  />
                </>
              )}
              {deliveryType == 1 && (
                <>
                  <Select
                    data={shippingProviders}
                    label="Shipping provider"
                    placeholder="Pick shipping provider"
                    {...form.getInputProps('shippingProvider')}
                  />

                  <TextInput
                    label="Tracking id"
                    placeholder="Enter tracking id"
                    {...form.getInputProps('shippingId')}
                  />
                  <Textarea
                    label="Comment"
                    placeholder="Enter comment"
                    {...form.getInputProps('comment')}
                    autosize
                  />
                </>
              )}

              <Button fullWidth mt="md" type="submit" loading={loading}>
                Update return delivery details
              </Button>
            </Fieldset>
          </form>
        )}
      </Modal>
    </>
  );
};

export default SubmitReturnDeliveryDetailsModal;
