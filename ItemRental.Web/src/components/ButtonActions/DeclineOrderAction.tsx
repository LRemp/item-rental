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

const DeclineOrderAction: React.FC<ItemButtonActionProps> = ({
  id,
  refresh,
  fullWidth = false,
  size = 'md',
}) => {
  const { loading, request } = useApiResult(() => api.Order.confirm(id));

  const openModal = () =>
    modals.openConfirmModal({
      centered: true,
      title: 'Decline this order request?',
      children: (
        <Text size="sm">
          Are you sure to confirm this order? The order status will be changes to Accepted and will
          begin the rent progress
        </Text>
      ),
      labels: { confirm: 'Decline', cancel: 'Cancel' },
      onCancel: () => console.log('Cancel'),
      onConfirm: async () => {
        /*const notificationId = notifications.show({
          loading: true,
          title: 'Loading',
          message: 'Accepting order...',
          autoClose: false,
          withCloseButton: false,
        });

        try {
          await request();
          notifications.update(
            Success({
              id: notificationId,
              title: 'Success',
              message: 'The order was successfuly confirmed!',
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
        }*/
      },
    });

  return (
    <>
      <Button color="red" size={size} onClick={openModal} fullWidth={fullWidth}>
        Decline
        <IconX size={18} />
      </Button>
    </>
  );
};

export default DeclineOrderAction;
