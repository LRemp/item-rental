import api from '@/api';
import { Navbar } from '@/components/Nagivation/Navbar/Navbar';
import useApiResult from '@/hooks/useApiResult';
import {
  Anchor,
  Box,
  Breadcrumbs,
  Button,
  Flex,
  Grid,
  Group,
  Loader,
  Paper,
  Text,
  Title,
  UnstyledButton,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconCross, IconPlus, IconX } from '@tabler/icons-react';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const pathItems = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Inventory', href: '/dashboard/inventory' },
  { title: 'Item' },
].map((item, index) => (
  <Anchor href={item.href} key={index}>
    {item.title}
  </Anchor>
));

const ItemPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { result: item, loading, error, request } = useApiResult(api.Item.get);

  useEffect(() => {
    request(id).catch((err) => navigate('/dashboard/inventory'));
  }, []);

  return (
    <Box m={'lg'} w={'100%'}>
      <Grid columns={24} grow>
        <Grid.Col span={24}>
          <Title fw={500} order={2}>
            Item
          </Title>
          <Breadcrumbs mt={'xs'}>{pathItems}</Breadcrumbs>
        </Grid.Col>
        <Grid.Col span={24}>
          {loading ? (
            <Grid w={'100%'} h={'100%'} justify="center" align="center">
              <Loader />
            </Grid>
          ) : (
            <ItemView {...item} />
          )}
        </Grid.Col>
      </Grid>
    </Box>
  );
};
export default ItemPage;

const ItemView: React.FC<Item> = ({ id, name, description, images, category, details }) => {
  const { loading: deleting, request: deleteItem } = useApiResult(() => api.Item.deleteItem(id));
  const navigate = useNavigate();

  const openDeleteModal = () =>
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
      onCancel: () => console.log('Cancel'),
      onConfirm: async () => {
        await deleteItem();
        navigate('/dashboard/inventory');
      },
    });

  return (
    <Grid>
      <Grid.Col span={{ base: 12, sm: 5 }}>
        <Paper shadow="xs" withBorder p={'md'}>
          <img src={`/images/${images[0]}`} width={'50%'}></img>
          <Group>
            <Title fw={600} order={3}>
              {name}
            </Title>
            <Text size="xs" opacity={'50%'}>
              ({category})
            </Text>
          </Group>
          <Text>{description}</Text>
        </Paper>
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 3 }}>
        <Group mb={'md'} justify="center">
          <Button color="blue">
            Create rent listing <IconPlus size={18} />
          </Button>
          <Button color="red" onClick={openDeleteModal}>
            Delete <IconX size={18} />
          </Button>
        </Group>
        <Paper shadow="xs" withBorder p={'md'}>
          <Text fw={600} size="md" mb={'md'}>
            Item details
          </Text>
          <Box>
            {details?.map((detail: Detail) => (
              <Grid justify="space-between">
                <Grid.Col span={'content'}>
                  <Text fw={600} size="sm">
                    {detail.name}
                  </Text>
                </Grid.Col>
                <Grid.Col span={'content'}>
                  <Text size="sm">{detail.value}</Text>
                </Grid.Col>
              </Grid>
            ))}
          </Box>
        </Paper>
      </Grid.Col>
    </Grid>
  );
};
