import { Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { useCallback } from 'react';
import { Error, Success } from '@/utils/Notifications';
import useApiResult from '@/hooks/useApiResult';
import api from '@/api';

const useAcceptOrderAction = () => {
  const { request } = useApiResult(api.Order.confirm);

  const confirmOrder = useCallback((id: string) => {
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
      onConfirm: async () => {
        const notificationId = notifications.show({
          loading: true,
          title: 'Loading',
          message: 'Accepting order...',
          autoClose: false,
          withCloseButton: false,
        });

        try {
          await request(id);
          notifications.update(
            Success({
              id: notificationId,
              title: 'Success',
              message: 'The order was successfuly confirmed!',
            })
          );
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
  }, []);

  return confirmOrder;
};

export default useAcceptOrderAction;
