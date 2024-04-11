import api from '@/api';
import CreateListingAction from '@/components/ButtonActions/CreateListingAction';
import DeleteItemAction from '@/components/ButtonActions/DeleteItemAction';
import CreateListingModal from '@/components/Modals/CreateListing';
import { Navbar } from '@/components/Nagivation/Navbar/Navbar';
import useApiResult from '@/hooks/useApiResult';
import { Success } from '@/utils/Notifications';
import {
  Anchor,
  Box,
  Breadcrumbs,
  Button,
  Flex,
  Grid,
  Group,
  Image,
  Loader,
  Paper,
  Text,
  Title,
  UnstyledButton,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconCross, IconPlaylistAdd, IconPlus, IconX } from '@tabler/icons-react';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NoImage from '@/assets/images/no_image.png';

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
          <Title fw={400} order={2}>
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
  return (
    <Grid>
      <Grid.Col span={{ base: 12, sm: 5 }}>
        <Paper shadow="xs" withBorder p={'md'}>
          <Image
            src={`/images/${images?.[0]}`}
            radius="xs"
            w="full"
            fit="contain"
            fallbackSrc={NoImage}
          />
          <Group mt={'sm'}>
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
        <ItemActions id={id} />
        <ItemDetails details={details} />
      </Grid.Col>
    </Grid>
  );
};

interface ItemActionsProps {
  id: string;
}

const ItemActions: React.FC<ItemActionsProps> = ({ id }) => {
  return (
    <Group mb={'md'} justify="center">
      <CreateListingAction id={id} />
      <DeleteItemAction id={id} />
    </Group>
  );
};

interface ItemDetailsProps {
  details: Detail[];
}

const ItemDetails: React.FC<ItemDetailsProps> = ({ details }) => {
  return (
    <Paper shadow="xs" withBorder p={'md'}>
      <Text fw={600} size="md" mb={'md'}>
        Item details
      </Text>
      <Box>
        {details?.map((detail: Detail) => (
          <Grid justify="space-between" key={detail.name}>
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
  );
};
