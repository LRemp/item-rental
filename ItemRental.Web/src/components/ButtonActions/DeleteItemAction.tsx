import { Button, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Success } from '@/utils/Notifications';
import useApiResult from '@/hooks/useApiResult';
import api from '@/api';

const DeleteItemAction: React.FC<ItemButtonActionProps> = ({ id }) => {
  const { request } = useApiResult(() => api.Item.deleteItem(id));
  const navigate = useNavigate();

  const openModal = () =>
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
        await request();
        notifications.show(
          Success({
            title: 'Success',
            message: 'The item was successfuly deleted!',
          })
        );
        navigate('/dashboard/inventory');
      },
    });

  return (
    <>
      <Button color="red" onClick={openModal} size="compact-sm">
        Delete
        <IconX size={18} />
      </Button>
    </>
  );
};

export default DeleteItemAction;
