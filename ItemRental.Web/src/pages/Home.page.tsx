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
  Title,
} from '@mantine/core';
import useApiResult from '@/hooks/useApiResult';
import api from '@/api';
import ListingCard from '@/components/ListingCard/ListingCard';
import { IconFilter } from '@tabler/icons-react';
import CategoriesFilterSelection from '@/components/Misc/Stats/CategoriesFilterSelection';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { nprogress } from '@mantine/nprogress';
import SelectCategoryAction from '@/components/ButtonActions/SelectCategoryAction';
import CategorySelection from '@/components/Selection/CategorySelection';

export function HomePage() {
  return (
    <>
      <RentListingsContainer />
    </>
  );
}

const RentListingsContainer = () => {
  const { category } = useParams();
  const { result, loading, request } = useApiResult(api.RentListing.getListings, []);

  useEffect(() => {
    request({
      category,
    });
  }, [category]);

  useEffect(() => {
    if (loading) {
      nprogress.start();
    } else {
      nprogress.complete();
    }
  }, [loading]);

  return (
    <Grid columns={18}>
      <Grid.Col span={18}>
        <Title my={'lg'} order={2} fw={400}>
          Listings
        </Title>
      </Grid.Col>
      <Grid.Col span={18} hiddenFrom="md">
        <CategorySelection />
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
            {result &&
              result?.rentListings &&
              result.rentListings.map((rentListing: RentListing) => (
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
