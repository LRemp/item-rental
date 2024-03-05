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
} from '@mantine/core';
import React, { useRef } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { FileDropzone } from '@/components/FileDropzone/FileDropzone';

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

  const openRef = useRef<() => void>(null);

  const form = useForm({
    initialValues: { name: '', description: '' },
    validate: {
      name: (value) => (value.length <= 0 ? 'You must enter the item name' : null),
    },
  });

  const addItem = (data: any) => {
    if (adding) return;
    add.open();
  };

  return (
    <Grid w={'100%'} m="lg">
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
            <TextInput label="Name" placeholder="Name" {...form.getInputProps('name')}></TextInput>
            <Textarea label="Description" placeholder="Description" autosize></Textarea>
            <FileDropzone />
            <Button fullWidth mt="md" type="submit" loading={adding}>
              Add Item
            </Button>
          </Fieldset>
        </form>
      </Modal>
      <Box ml={'auto'}>
        <Button variant="filled" onClick={open}>
          Add new item
        </Button>
      </Box>
      <ItemsList />
    </Grid>
  );
}

const ItemsList = () => {
  const rows = elements.map((element) => (
    <Table.Tr key={element.name}>
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
