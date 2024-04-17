import {
  Box,
  Button,
  Center,
  Grid,
  Group,
  Loader,
  Pagination,
  SimpleGrid,
  Text,
} from '@mantine/core';
import useApiResult from '@/hooks/useApiResult';
import api from '@/api';
import ListingCard from '@/components/ListingCard/ListingCard';
import CategoriesFilterSelection from '@/components/Misc/Stats/CategoriesFilterSelection';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export function HomePage() {
  return (
    <>
      <RentListingsContainer />
    </>
  );
}

const RentListingsContainer = () => {
  const { category } = useParams();
  const {
    result: pageData,
    loading,
    request,
  } = useApiResult<PaginatedResult<RentListing>>(api.RentListing.getListings, []);

  useEffect(() => {
    request({
      category,
    });
  }, [category]);

  return (
    <Grid columns={18}>
      <Grid.Col span={18} hiddenFrom="md">
        <Button>
          Select category <IconFilter size={18} />
        </Button>
      </Grid.Col>
      <Grid.Col span={{ base: 18, md: 14 }}>
        {loading ? (
          <Center h={'70vh'} w={'100%'}>
            <Group>
              <Loader></Loader>
              <Text>Loading the rent offers...</Text>
            </Group>
          </Center>
        ) : (
          <Grid columns={18}>
              {pageData.result.map((rentListing: RentListing) => (
                <Grid.Col span={6} key={rentListing.id}>
                  <ListingCard {...rentListing} />
                </Grid.Col>
              ))}
            <Grid.Col span={18}>
              <Center>
                <Pagination total={10} />
              </Center>
            </Grid.Col>
          </Grid>
        )}
      </Grid.Col>
      <Grid.Col span={{ base: 0, md: 4 }}>
        <Box visibleFrom="md">
          <CategoriesFilterSelection />
        </Box>
      </Grid.Col>
    </Grid>
  );
};
