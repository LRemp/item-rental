import api from '@/api';
import useApiResult from '@/hooks/useApiResult';
import { Error, Success } from '@/utils/Notifications';
import { ActionIcon, Box, Center, Loader, Menu, Table, Text, rem } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconMenu2, IconX, IconEdit, IconCheck, IconEye } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

interface ItemActionsProps {
  id: string;
  refresh: Function;
  data: any;
}

const ItemActions: React.FC<ItemActionsProps> = ({ data, id, refresh }) => {
  const { request: approve } = useApiResult(api.User.approveVerificationRequest);
  const { request: reject } = useApiResult(api.User.rejectVerificationRequest);
  const navigate = useNavigate();

  const openApproveModal = () =>
    modals.openConfirmModal({
      title: 'Patvrtinti užklausą',
      centered: true,
      children: (
        <Text size="sm">
          Ar esate įsitikinę, kad norite pašalinti šią kategoriją? Ši operacija yra negrįžtama ir
          gali sukelti sutrikimų sistemoje.
        </Text>
      ),
      labels: { confirm: 'Patvirtinti', cancel: 'Atšaukti' },
      confirmProps: { color: 'green' },
      onCancel: () => console.log('Cancel'),
      onConfirm: async () => {
        const notificationId = notifications.show({
          loading: true,
          title: 'Kraunama',
          message: 'Patvirtinima verifikavimo užklausa...',
          autoClose: false,
          withCloseButton: false,
        });

        try {
          await approve(id);

          notifications.update(
            Success({
              id: notificationId,
              title: 'Patvirtinta!',
              message: 'Užklausa sėkmingai patvirtinta!',
            })
          );

          refresh();
        } catch (e: any) {
          console.log(e);
          notifications.update(
            Error({ id: notificationId, title: 'Klaida', message: e.description })
          );
        }
      },
    });

  const openRejectModal = () =>
    modals.openConfirmModal({
      title: 'Pašalinti kategoriją',
      centered: true,
      children: (
        <Text size="sm">
          Ar esate įsitikinę, kad norite pašalinti šią kategoriją? Ši operacija yra negrįžtama ir
          gali sukelti sutrikimų sistemoje.
        </Text>
      ),
      labels: { confirm: 'Atmesti', cancel: 'Atšaukti' },
      confirmProps: { color: 'red' },
      onCancel: () => console.log('Cancel'),
      onConfirm: async () => {
        const notificationId = notifications.show({
          loading: true,
          title: 'Kraunama',
          message: 'Atmetama verifikavimo užklausa...',
          autoClose: false,
          withCloseButton: false,
        });

        try {
          await reject(id);

          notifications.update(
            Success({
              id: notificationId,
              title: 'Atmesta!',
              message: 'Užklausa sėkmingai atmesta!',
            })
          );

          refresh();
        } catch (e: any) {
          notifications.update(
            Error({ id: notificationId, title: 'Klaida', message: e.description })
          );
        }
      },
    });

  return (
    <>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <ActionIcon variant="subtle" aria-label="Settings" color="gray">
            <IconMenu2 style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Veiksmai</Menu.Label>
          <Menu.Item
            leftSection={<IconEye style={{ width: rem(14), height: rem(14) }} />}
            onClick={() => navigate(`/user/${data.user?.username}`)}
          >
            Peržiūrėti profilį
          </Menu.Item>
          <Menu.Item
            color="green"
            leftSection={<IconCheck style={{ width: rem(14), height: rem(14) }} />}
            onClick={openApproveModal}
          >
            Patvirtinti
          </Menu.Item>
          <Menu.Item
            color="red"
            leftSection={<IconX style={{ width: rem(14), height: rem(14) }} />}
            onClick={openRejectModal}
          >
            Atmesti
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
};

const VerificationRequests: React.FC = () => {
  const {
    result: requests,
    error,
    loading,
    request: refresh,
  } = useApiResult(api.User.getVerificationRequests, []);

  const rows = requests?.map((element: any) => (
    <Table.Tr key={element.id}>
      <Table.Td>
        {element.user?.name} {element.user?.surname}
      </Table.Td>
      <Table.Td>{element.user?.username}</Table.Td>
      <Table.Td>{element.user?.email}</Table.Td>
      <Table.Td>
        <ItemActions data={element} id={element.id} refresh={refresh} />
      </Table.Td>
    </Table.Tr>
  ));

  console.log(requests);

  return (
    <Box>
      {loading ? (
        <Center p="lg">
          <Loader />
        </Center>
      ) : (
        <Box>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Naudotojas</Table.Th>
                <Table.Th>Slapyvardis</Table.Th>
                <Table.Th>El. paštas</Table.Th>
                <Table.Th w={'50px'}></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Box>
      )}
    </Box>
  );
};

export default VerificationRequests;
