import {
  Anchor,
  Badge,
  Box,
  Breadcrumbs,
  Grid,
  Group,
  Image,
  Loader,
  Paper,
  Tabs,
  Text,
  Title,
} from '@mantine/core';
import { IconList } from '@tabler/icons-react';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '@/api';
import CreateListingAction from '@/components/ButtonActions/CreateListingAction';
import DeleteItemAction from '@/components/ButtonActions/DeleteItemAction';
import useApiResult from '@/hooks/useApiResult';
import NoImage from '@/assets/images/no_image.png';
import PhotoCarousel from '@/components/Misc/PhotoCarousel';

const pathItems = [
  { title: 'Pagrindinis', href: '/dashboard/home' },
  { title: 'Inventorius', href: '/dashboard/inventory' },
  { title: 'Daiktas' },
].map((item, index) => (
  <Anchor href={item.href} key={index}>
    {item.title}
  </Anchor>
));

interface ItemActionsProps {
  id: string;
}

const ItemActions: React.FC<ItemActionsProps> = ({ id }) => (
  <Group mb="md" justify="center">
    <CreateListingAction id={id} />
    <DeleteItemAction id={id} />
  </Group>
);

interface ItemDetailsProps {
  details: Detail[];
}

const ItemDetails: React.FC<ItemDetailsProps> = ({ details }) => (
  <Tabs defaultValue="first">
    <Tabs.List>
      <Tabs.Tab value="first" leftSection={<IconList size={18} />}>
        Daikto ypatybės
      </Tabs.Tab>
    </Tabs.List>

    <Tabs.Panel value="first">
      {details?.length === 0 ? (
        <Text mt="md" fs="italic">
          Informacijos nerasta
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

const ItemView: React.FC<Item> = ({ id, name, description, images, category, details, tags }) => (
  <Paper shadow="md" radius="sm" p="md">
    <Grid>
      <Grid.Col span={{ base: 12, sm: 5 }}>
        {images == null ? (
          <Image src={NoImage} radius="xs" w="full" fit="contain" />
        ) : (
          <PhotoCarousel images={images} />
        )}

        <Group mt="sm">
          <Title fw={600} order={3}>
            {name}
          </Title>
          <Text size="xs" opacity="50%">
            ({category})
          </Text>
        </Group>
        {tags && (
          <Text>
            {tags.map((x: string, index: number) => (
              <Badge variant="default" radius="xl" size="xs" mr="2px" key={index}>
                <Text fw={400} size="xs">
                  {x.toUpperCase()}
                </Text>
              </Badge>
            ))}
          </Text>
        )}
        <Text>{description}</Text>
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 3 }}>
        <ItemActions id={id} />
        <ItemDetails details={details} />
      </Grid.Col>
    </Grid>
  </Paper>
);

const Item = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { result: item, loading, request } = useApiResult(api.Item.get);

  useEffect(() => {
    request(id).catch(() => navigate('/dashboard/inventory'));
  }, []);

  return (
    <Box w="100%">
      <Grid columns={24} grow>
        <Grid.Col span={24}>
          <Title fw={700}>Item</Title>
          <Breadcrumbs mt="xs">{pathItems}</Breadcrumbs>
        </Grid.Col>
        <Grid.Col span={24}>
          {loading ? (
            <Grid w="100%" h="100%" justify="center" align="center">
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
export default Item;
