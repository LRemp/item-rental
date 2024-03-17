import { Navbar } from '@/components/Navbar/Navbar';
import {
  Box,
  Button,
  Fieldset,
  Flex,
  Grid,
  Group,
  Modal,
  Paper,
  Table,
  TextInput,
  Textarea,
  Title,
} from '@mantine/core';
import React, { useRef } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { FormFileDropzone } from '@/components/FileDropzone/FormFileDropzone';
import api from '@/api';
import useApiResult from '@/hooks/useApiResult';
import useUploadImage from '@/hooks/useUploadImage';
import { notifications } from '@mantine/notifications';
import { Error, Success } from '@/utils/Notifications';

const elements = [
  { position: 1, mass: 12.011, symbol: 'C', name: 'Carbon' },
  { position: 2, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
  { position: 3, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
  { position: 4, mass: 137.33, symbol: 'Ba', name: 'Barium' },
  { position: 5, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
];

export default function Inventory() {
  const [opened, { open, close }] = useDisclosure(false);
  const [adding, add] = useDisclosure(false);

  const { result, loading, error, request } = useApiResult(api.Item.create);
  const uploadImage = useUploadImage();

  const form = useForm({
    initialValues: { name: '', description: '', files: [] },
    validate: {
      name: (value) => (value.length <= 0 ? 'You must enter the item name' : null),
    },
  });

  const addItem = async (data: any) => {
    if (adding) return;
    add.open();
    const notificationId = notifications.show({
      loading: true,
      title: 'Loading',
      message: 'Creating item...',
      autoClose: false,
      withCloseButton: false,
    });

    const imageUpload = await uploadImage(data.files);

    console.log(imageUpload);
    if (!imageUpload.success) {
      add.close();
      return notifications.update(
        Error({
          id: notificationId,
          title: 'Error',
          message: 'Failed to upload images',
          autoClose: 2000,
        })
      );
    }

    try {
      const createRequest = await request({
        name: data.name,
        description: data.description,
        images: imageUpload.data,
      });

      notifications.update(
        Success({
          id: notificationId,
          title: 'Success',
          message: 'Item created!',
        })
      );
      close();
      add.close();
    } catch (error: any) {
      console.log(error);
      notifications.update(
        Error({ id: notificationId, title: 'Error', message: error.description })
      );
      add.close();
    }
  };

  return (
    <Box m={'lg'} w={'100%'}>
      <Grid columns={24} grow>
        <Modal
          opened={opened}
          onClose={close}
          title="Add new item"
          centered
          size={'lg'}
          closeOnClickOutside={!adding}
          closeOnEscape={!adding}
          withCloseButton={!adding}
        >
          <form onSubmit={form.onSubmit((values) => addItem(values))}>
            <Fieldset disabled={adding} variant="unstyled">
              <TextInput
                label="Name"
                placeholder="Name"
                {...form.getInputProps('name')}
              ></TextInput>
              <Textarea label="Description" placeholder="Description" autosize></Textarea>
              <FormFileDropzone {...form.getInputProps('files')} />
              <Button fullWidth mt="md" type="submit" loading={adding}>
                Add Item
              </Button>
            </Fieldset>
          </form>
        </Modal>
        <Grid.Col span={24}>
          <Box>
            <Button variant="filled" onClick={open}>
              Add new item
            </Button>
          </Box>
        </Grid.Col>
        <Grid.Col span={24}>
          <Paper shadow="md" p={'md'}>
            <Title order={5}>Inventory items</Title>
          </Paper>
        </Grid.Col>
      </Grid>
    </Box>
  );
}

const ItemsList = () => {
  const rows = elements.map((element) => (
    <Table.Tr key={element.name} m={'md'}>
      <Table.Td>{element.position}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.symbol}</Table.Td>
      <Table.Td>{element.mass}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Paper shadow="lg" w={'100%'}>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Id</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Symbol</Table.Th>
            <Table.Th>Tags</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Paper>
  );
};
