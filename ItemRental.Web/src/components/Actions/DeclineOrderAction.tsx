import { Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { useCallback } from 'react';
import { Error, Success } from '@/utils/Notifications';
import useApiResult from '@/hooks/useApiResult';
import api from '@/api';

const useDeclineOrderAction = () => {
  const { request } = useApiResult(api.Order.decline);

  const declineOrder = useCallback((id: string) => {
    modals.openConfirmModal({
      centered: true,
      title: 'Ar atmesti šią rezervaciją?',
      children: (
        <Text size="sm">
          Ar jūs tikrai norite atmesti šią rezervaciją? Atmetus rezervaciją bus atšaukiama nuomos
          užklausa ir šios užklausos nuomos rezervuotas laikotarpis bus atlaisvintas
        </Text>
      ),
      labels: { confirm: 'Atmesti', cancel: 'Atšaukti' },
      confirmProps: { color: 'red' },
      onConfirm: async () => {
        const notificationId = notifications.show({
          loading: true,
          title: 'Vykdoma',
          message: 'Atšaukiama rezervacija...',
          autoClose: false,
          withCloseButton: false,
        });

        try {
          await request(id);
          notifications.update(
            Success({
              id: notificationId,
              title: 'Įvykdyta',
              message: 'Nuomos rezervacija sėkmingai atšaukta!',
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

  return declineOrder;
};

export default useDeclineOrderAction;
