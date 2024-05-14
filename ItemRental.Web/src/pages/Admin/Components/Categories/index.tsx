import api from '@/api';
import useApiResult from '@/hooks/useApiResult';
import { Error, Success } from '@/utils/Notifications';
import { ActionIcon, Box, Center, Loader, Menu, Table, Text, rem } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconMenu2, IconX, IconEdit } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import CreateCategoryModal from './CreateCategoryModal';
import UpdateCategoryModal from './UpdateCategoryModal';
import { useDisclosure } from '@mantine/hooks';

interface ItemActionsProps {
  id: string;
  refresh: Function;
  data: any;
}

const ItemActions: React.FC<ItemActionsProps> = ({ data, id, refresh }) => {
  console.log(id);
  const { request: remove } = useApiResult(api.Category.remove);
  const [opened, { open, close }] = useDisclosure(false);

  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: 'Pašalinti kategoriją',
      centered: true,
      children: (
        <Text size="sm">
          Ar esate įsitikinę, kad norite pašalinti šią kategoriją? Ši operacija yra negrįžtama ir
          gali sukelti sutrikimų sistemoje.
        </Text>
      ),
      labels: { confirm: 'Pašalinti', cancel: 'Atšaukti' },
      confirmProps: { color: 'red' },
      onCancel: () => console.log('Cancel'),
      onConfirm: async () => {
        const notificationId = notifications.show({
          loading: true,
          title: 'Kraunama',
          message: 'Pašalinama kategorija...',
          autoClose: false,
          withCloseButton: false,
        });

        try {
          await remove(id);

          notifications.update(
            Success({
              id: notificationId,
              title: 'Pašalinta!',
              message: 'Kategorija sėkmingai pašalinta!',
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
      <UpdateCategoryModal
        open={open}
        opened={opened}
        close={close}
        data={data}
        refresh={refresh}
      />
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <ActionIcon variant="subtle" aria-label="Settings" color="gray">
            <IconMenu2 style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Veiksmai</Menu.Label>
          <Menu.Item
            leftSection={<IconEdit style={{ width: rem(14), height: rem(14) }} />}
            onClick={() => open()}
          >
            Redaguoti
          </Menu.Item>
          <Menu.Item
            color="red"
            leftSection={<IconX style={{ width: rem(14), height: rem(14) }} />}
            onClick={openDeleteModal}
          >
            Pašalinti
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
};

const Categories: React.FC = () => {
  const {
    result: requests,
    error,
    loading,
    request: refresh,
  } = useApiResult(api.Category.getAll, []);

  const rows = requests?.map((element: any) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.label}</Table.Td>
      <Table.Td>{element.parent}</Table.Td>
      <Table.Td>
        <ItemActions data={element} id={element.id} refresh={refresh} />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Box>
      {loading ? (
        <Center p="lg">
          <Loader />
        </Center>
      ) : (
        <Box>
          <CreateCategoryModal refresh={refresh} />
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Vardas</Table.Th>
                <Table.Th>Pavadinimas</Table.Th>
                <Table.Th>Tėvinė kategorija</Table.Th>
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

export default Categories;
