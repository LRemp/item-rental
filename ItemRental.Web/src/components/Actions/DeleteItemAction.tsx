import { Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { useCallback } from 'react';
import { Error, Success } from '@/utils/Notifications';
import useApiResult from '@/hooks/useApiResult';
import api from '@/api';

const useDeleteAction = () => {
  const { request } = useApiResult(api.Item.deleteItem);

  const deleteItem = useCallback((id: string, handler?: Function) => {
    modals.openConfirmModal({
      title: 'Delete this item?',
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete this item? This action is irreversible and the data about
          the item will be lost.
        </Text>
      ),
      labels: { confirm: 'Delete item', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: async () => {
        const notificationId = notifications.show({
          loading: true,
          title: 'Loading',
          message: 'Deleting item...',
          autoClose: false,
          withCloseButton: false,
        });

        try {
          await request(id);
          notifications.update(
            Success({
              id: notificationId,
              title: 'Success',
              message: 'The item was successfuly deleted!',
            })
          );
          handler && handler();
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

  return deleteItem;
};

export default useDeleteAction;
