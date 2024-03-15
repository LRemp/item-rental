import api from '@/api';
import PhotoCarousel from '@/components/PhotoCarousel';
import { UserProfileCard } from '@/components/UserProfileCard';
import useApiResult from '@/hooks/useApiResult';
import { Badge, Box, Center, Grid, GridCol, Group, Loader, Text, Title } from '@mantine/core';
import React from 'react';
import { useParams } from 'react-router-dom';

function Listing() {
  const { id } = useParams();
  const { result, loading, request } = useApiResult<RentListing>(
    () => api.RentListing.getListingById(id || ''),
    []
  );

  return (
    <Grid w={'100%'}>
      {loading ? (
        <Center h={'70vh'} w={'100%'}>
          <Group>
            <Loader></Loader>
            <Text>Loading up the listing...</Text>
          </Group>
        </Center>
      ) : (
        <>
          <Grid columns={12} w={'100%'}>
            <Grid.Col span={8}>
              <PhotoCarousel />
              <Group my={12}>
                <Group justify="space-between" w={'100%'}>
                  <Title order={3} fw={600}>
                    {result?.title}
                  </Title>
                  <Badge size="20" px="10" py="15" variant="light" radius={'sm'} fw={600}>
                    {result?.price} Eur / day
                  </Badge>
                </Group>
                <div>{result?.description}</div>
              </Group>
            </Grid.Col>
            <Grid.Col span={4}>
              <UserProfileCard />
            </Grid.Col>
          </Grid>
        </>
      )}
    </Grid>
  );
}

export default Listing;
