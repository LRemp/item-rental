import api from '@/api';
import useApiResult from '@/hooks/useApiResult';
import { Error, Success } from '@/utils/Notifications';
import { Button, Text, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ConfirmOrderAction: React.FC<ActionButtonProps> = ({ id, refresh, button }) => {
  const { loading, request } = useApiResult(() => api.Order.confirm(id));

  const openModal = () =>
    modals.openConfirmModal({
      centered: true,
      title: 'Confirm this order request?',
      children: (
        <Text size="sm">
          Are you sure to confirm this order? The order status will be changes to Accepted and will
          begin the rent progress
        </Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onCancel: () => console.log('Cancel'),
      onConfirm: async () => {
        const notificationId = notifications.show({
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
        }
      },
    });

  return <UnstyledButton onClick={openModal}>{button}</UnstyledButton>;
};

export default ConfirmOrderAction;
