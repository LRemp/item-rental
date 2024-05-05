import { Button, Text, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Error, Success } from '@/utils/Notifications';
import useApiResult from '@/hooks/useApiResult';
import api from '@/api';

const DeclineOrderAction: React.FC<ActionButtonProps> = ({ id, refresh, button }) => {
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

  return <>{button}</>;
};

export default DeclineOrderAction;
