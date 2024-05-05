import { Button, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import React from 'react';
import { Error, Success } from '@/utils/Notifications';
import useApiResult from '@/hooks/useApiResult';
import api from '@/api';

const ConfirmOrderDeliveryAction: React.FC<ItemButtonActionProps> = ({
  id,
  refresh,
  fullWidth = false,
  size = 'md',
}) => {
  const { request } = useApiResult(() => api.Delivery.confirm(id));

  const openModal = () =>
    modals.openConfirmModal({
      centered: true,
      title: 'Confirm this order delivery request?',
      children: (
        <Text size="sm">
          Are you sure to confirm this order delivery? The order status will be changes to Relivered
          and status will be updated and the change irreversible.
        </Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onConfirm: async () => {
        const notificationId = notifications.show({
          loading: true,
          title: 'Loading',
          message: 'Confirming order delivery...',
          autoClose: false,
          withCloseButton: false,
        });

        try {
          await request();
          notifications.update(
            Success({
              id: notificationId,
              title: 'Success',
              message: 'The order delivery was successfuly confirmed!',
            })
          );
          refresh && refresh();
        } catch (e: any) {
          notifications.update(
            Error({
              id: notificationId,
              title: 'Error',
              message: e.message,
            })
          );
        }
      },
    });

  return (
    <>
      <Button color="green" size={size} onClick={openModal} fullWidth={fullWidth}>
        Confirm order delivery
        <IconCheck size={18} />
      </Button>
    </>
  );
};

export default ConfirmOrderDeliveryAction;
