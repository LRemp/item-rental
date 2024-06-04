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
      title: 'Ar patvirtinti šią rezervaciją?',
      children: (
        <Text size="sm">
          Ar tikrai norite patvirtinti šią rezervaciją? Patvirtinus rezervaciją prasidės nuomos
          procesas ir šis žingsis nėra sugrąžinamas!
        </Text>
      ),
      labels: { confirm: 'Patvirtinti', cancel: 'Atšaukti' },
      confirmProps: { color: 'green' },
      onConfirm: async () => {
        const notificationId = notifications.show({
          loading: true,
          title: 'Vykdoma',
          message: 'Patvirtinima nuomos rezervacija...',
          autoClose: false,
          withCloseButton: false,
        });

        try {
          await request(id);
          notifications.update(
            Success({
              id: notificationId,
              title: 'Įvykdyta',
              message: 'Nuomos rezervacija sėkmingai patvirtinta!',
            })
          );
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
  }, []);

  return confirmOrder;
};

export default useAcceptOrderAction;
