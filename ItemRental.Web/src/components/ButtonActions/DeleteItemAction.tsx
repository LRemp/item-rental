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
      title: 'Ar tikrai norite ištrinti šį daiktą?',
      centered: true,
      children: (
        <Text size="sm">
          Ar tikrai norite ištrinti šį daiktą? Šis veiksmas yra negrįžtamas ir visi susiję duomenys
          bus panaikinti iš sistemos.
        </Text>
      ),
      labels: { confirm: 'Ištrinti', cancel: 'Atšaukti' },
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
      <Button color="red" onClick={openModal}>
        Ištrinti
        <IconX size={18} />
      </Button>
    </>
  );
};

export default DeleteItemAction;
