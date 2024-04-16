import api from '@/api';
import useApiResult from '@/hooks/useApiResult';
import { Error, Success } from '@/utils/Notifications';
import { Button, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ConfirmReturnDeliveryAction: React.FC<ItemButtonActionProps> = ({
  id,
  refresh,
  fullWidth = false,
  size = 'md',
}) => {
  const { loading, request } = useApiResult(() => api.Delivery.confirm(id));

  const openModal = () =>
    modals.openConfirmModal({
      centered: true,
      title: 'Confirm this order return delivery?',
      children: (
        <Text size="sm">
          Are you sure to confirm this order delivery? The order status will be changes to Relivered
          and status will be updated and the change irreversible.
        </Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onCancel: () => console.log('Cancel'),
      onConfirm: async () => {
        const notificationId = notifications.show({
          loading: true,
          title: 'Loading',
          message: 'Confirming return delivery...',
          autoClose: false,
          withCloseButton: false,
        });

        try {
          await request();
          notifications.update(
            Success({
              id: notificationId,
              title: 'Success',
              message: 'The order return delivery was successfuly confirmed!',
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
        Confirm return delivery
        <IconCheck size={18} />
      </Button>
    </>
  );
};

export default ConfirmReturnDeliveryAction;
