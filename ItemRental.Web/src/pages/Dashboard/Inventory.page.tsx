import { Navbar } from '@/components/Nagivation/Navbar/Navbar';
import {
  Anchor,
  Box,
  Breadcrumbs,
  Button,
  Center,
  Fieldset,
  Flex,
  Grid,
  Group,
  Loader,
  Modal,
  Paper,
  Select,
  Table,
  TextInput,
  Textarea,
  Title,
} from '@mantine/core';
import React, { useRef } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { IconUpload, IconPhoto, IconX, IconPlus } from '@tabler/icons-react';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { FormFileDropzone } from '@/components/FileDropzone/FormFileDropzone';
import api from '@/api';
import useApiResult from '@/hooks/useApiResult';
import useUploadImage from '@/hooks/useUploadImage';
import { notifications } from '@mantine/notifications';
import { Error, Success } from '@/utils/Notifications';
import CreateItemModal from '@/components/Modals/CreateItemModal';
import ItemTable from '@/components/Tables/ItemTable';

const elements = [
  { position: 1, mass: 12.011, symbol: 'C', name: 'Carbon' },
  { position: 2, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
  { position: 3, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
  { position: 4, mass: 137.33, symbol: 'Ba', name: 'Barium' },
  { position: 5, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
];

const pathItems = [{ title: 'Dashboard', href: '/dashboard' }, { title: 'Inventory' }].map(
  (item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  )
);

export default function Inventory() {
  const [opened, { open, close }] = useDisclosure(false);
  const {
    result: items,
    error,
    loading,
    request,
  } = useApiResult<Item[]>(() => api.Item.getAll(), []);

  return (
    <Box m={'lg'} w={'100%'}>
      <Grid columns={24} grow>
        <Grid.Col span={24}>
          <Grid justify="space-between" align="flex-end">
            <Grid.Col span={1}>
              <Title fw={500} order={2}>
                Inventory
              </Title>
              <Breadcrumbs mt={'xs'}>{pathItems}</Breadcrumbs>
            </Grid.Col>
            <Grid.Col span={1}>
              <Button variant="filled" onClick={open}>
                <IconPlus size={18} />
                Add new item
              </Button>
            </Grid.Col>
          </Grid>
          <Box></Box>
        </Grid.Col>
        <Grid.Col span={24}>
          <CreateItemModal opened={opened} close={close} />
        </Grid.Col>
        <Grid.Col span={24}>
          <Paper p={'md'}>
            <Title order={5}>Inventory items</Title>
            {loading ? (
              <Center>
                <Loader />
              </Center>
            ) : (
              <ItemTable items={items} />
            )}
          </Paper>
        </Grid.Col>
      </Grid>
    </Box>
  );
}
