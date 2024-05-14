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
      title: 'Patvirtinti šio užsakymo pristatymą?',
      children: (
        <Text size="sm">
          Ar esate įsitikinę, kad norite patvirtinti šio užsakymo pristatymą? Ši operacija yra
          negrįžtama.
        </Text>
      ),
      labels: { confirm: 'Patvirtinti', cancel: 'Atšaukti' },
      onConfirm: async () => {
        const notificationId = notifications.show({
          loading: true,
          title: 'Vykdoma',
          message: 'Patvirtinamas užsakymo pristatymas...',
          autoClose: false,
          withCloseButton: false,
        });

        try {
          await request();
          notifications.update(
            Success({
              id: notificationId,
              title: 'Patvirtinta',
              message: 'Užsakymo pristatymas sėkmingai patvirtintas',
            })
          );
          refresh && refresh();
        } catch (e: any) {
          notifications.update(
            Error({
              id: notificationId,
              title: 'Klaida',
              message: e.message,
            })
          );
        }
      },
    });

  return (
    <>
      <Button color="green" size={size} onClick={openModal} fullWidth={fullWidth}>
        Patvirtinti pristatymą
        <IconCheck size={18} />
      </Button>
    </>
  );
};

export default ConfirmOrderDeliveryAction;
