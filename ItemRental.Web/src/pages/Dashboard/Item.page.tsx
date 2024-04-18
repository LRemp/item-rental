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
  Tabs,
  Text,
  Title,
  UnstyledButton,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import {
  IconCross,
  IconDatabase,
  IconList,
  IconPlaylistAdd,
  IconPlus,
  IconX,
} from '@tabler/icons-react';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NoImage from '@/assets/images/no_image.png';
import PhotoCarousel from '@/components/Misc/PhotoCarousel';

const pathItems = [
  { title: 'Dashboard', href: '/dashboard/home' },
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
    <Box w={'100%'}>
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
  console.log(images);
  return (
    <Grid>
      <Grid.Col span={{ base: 12, sm: 5 }}>
        <Paper>
          {images == null ? (
            <Image src={NoImage} radius="xs" w="full" fit="contain" />
          ) : (
            <PhotoCarousel images={images} />
          )}

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
    <Tabs defaultValue="first">
      <Tabs.List>
        <Tabs.Tab value="first" leftSection={<IconList size={18} />}>
          Item details
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="first">
        {details?.length == 0 ? (
          <Text mt={'md'} fs="italic">
            No details found
          </Text>
        ) : (
          <>
            {details?.map((detail: Detail) => (
              <Box>
                <Text fw={500}>{detail.name}</Text>
                <Text>{detail.value}</Text>
              </Box>
            ))}
          </>
        )}
      </Tabs.Panel>
    </Tabs>
  );
};
