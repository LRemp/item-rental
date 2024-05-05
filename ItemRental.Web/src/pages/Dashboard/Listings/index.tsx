import { Anchor, Box, Breadcrumbs, Center, Grid, Loader, Title } from '@mantine/core';
import React, { useEffect } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { nprogress } from '@mantine/nprogress';
import api from '@/api';
import useApiResult from '@/hooks/useApiResult';
import CreateItemModal from '@/components/Modals/CreateItem';
import TableContainer from './Components/TableContainer';

const pathItems = [{ title: 'Dashboard', href: '/dashboard/home' }, { title: 'Rent Listings' }].map(
  (item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  )
);

export default function Inventory() {
  const [opened, { close }] = useDisclosure(false);
  const { result: items, loading } = useApiResult<Item[]>(
    () => api.RentListing.getListingsByOwner(),
    []
  );

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
          <Grid justify="space-between" align="flex-end">
            <Grid.Col span={16}>
              <Title fw={600}>Nuomos skelbimai</Title>
              <Breadcrumbs mt="xs">{pathItems}</Breadcrumbs>
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col span={24}>
          <CreateItemModal opened={opened} close={close} />
        </Grid.Col>
        <Grid.Col span={24}>
          {loading ? (
            <Center>
              <Loader />
            </Center>
          ) : (
            <TableContainer items={items} />
          )}
        </Grid.Col>
      </Grid>
    </Box>
  );
}
