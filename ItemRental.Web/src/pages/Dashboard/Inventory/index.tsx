import { Box, Button, Center, Grid, Group, Loader, Title } from '@mantine/core';
import React, { useEffect } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { nprogress } from '@mantine/nprogress';
import api from '@/api';
import useApiResult from '@/hooks/useApiResult';
import CreateItemModal from '@/components/Modals/CreateItem';
import PagePath from '@/components/Nagivation/PagePath';
import TableContainer from './Components/TableContainer';

const pagePath: PageLink[] = [
  { title: 'Pagrindinis', href: '/dashboard/home' },
  { title: 'Inventorius' },
];

export default function Inventory() {
  const [opened, { open, close }] = useDisclosure(false);
  const { result: items, loading } = useApiResult(() => api.Item.getAll(), []);

  useEffect(() => {
    if (loading) {
      nprogress.start();
    } else {
      nprogress.complete();
    }
  }, [loading]);

  return (
    <Box w="100%">
      <Grid columns={24} grow>
        <Grid.Col span={24}>
          <Group justify="space-between">
            <Box>
              <Title fw={700}>Inventorius</Title>
              <PagePath links={pagePath} />
            </Box>
            <Button variant="filled" onClick={open}>
              <IconPlus size={18} />
              Pridėti naują daiktą
            </Button>
            <CreateItemModal opened={opened} close={close} />
          </Group>
        </Grid.Col>
        <Grid.Col span={24}>
          <Box>
            {loading ? (
              <Center>
                <Loader />
              </Center>
            ) : (
              <TableContainer items={items} />
            )}
          </Box>
        </Grid.Col>
      </Grid>
    </Box>
  );
}
