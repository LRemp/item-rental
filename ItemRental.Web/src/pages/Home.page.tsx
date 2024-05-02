import {
  Box,
  Button,
  Center,
  Grid,
  GridCol,
  Group,
  Input,
  Loader,
  Pagination,
  SimpleGrid,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import useApiResult from '@/hooks/useApiResult';
import api from '@/api';
import ListingCard from '@/components/ListingCard/ListingCard';
import { IconFilter, IconSearch } from '@tabler/icons-react';
import CategoriesFilterSelection from '@/components/Misc/Stats/CategoriesFilterSelection';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { nprogress } from '@mantine/nprogress';
import CategorySelection from '@/components/Selection/CategorySelection';
import { useDebouncedState } from '@mantine/hooks';

export function HomePage() {
  return (
    <>
      <RentListingsContainer />
    </>
  );
}

const RentListingsContainer = () => {
  return (
    <Grid columns={18}>
      <Grid.Col span={18}>
        <Title fw={400} order={2}>
          Listings
        </Title>
      </Grid.Col>
      <Grid.Col span={18} hiddenFrom="md">
        <CategorySelection />
      </Grid.Col>
      <Grid.Col span={{ base: 18, md: 15 }}>
        <ItemsContainer />
      </Grid.Col>
      <Grid.Col span={{ base: 0, md: 3 }}>
        <Box visibleFrom="md">
          <CategoriesFilterSelection />
        </Box>
      </Grid.Col>
    </Grid>
  );
};

const ItemsContainer: React.FC = () => {
  const [searchArgument, setSearch] = useDebouncedState('', 500);
  const [page, setPage] = useState<number>(1);
  const { category } = useParams();
  const {
    result: pageData,
    loading,
    request,
  } = useApiResult<PaginatedResult<RentListing>>(api.RentListing.getListings, []);

  useEffect(() => {
    if (loading) {
      nprogress.start();
    } else {
      nprogress.complete();
    }
  }, [loading]);

  useEffect(() => {
    request({
      category,
      page,
      searchArgument,
    });
  }, [category, page, searchArgument]);

  return (
    <Grid columns={18}>
      <Grid.Col span={18}>
        <TextInput
          placeholder={'Search listings...'}
          leftSection={<IconSearch />}
          onChange={(event) => setSearch(event.currentTarget.value)}
        />
      </Grid.Col>

      {loading ? (
        <Center h={'70vh'} w={'100%'}>
          <Group>
            <Loader></Loader>
            <Text>Loading the rent offers...</Text>
          </Group>
        </Center>
      ) : pageData?.result.length != 0 ? (
        <>
          {pageData?.result?.map((rentListing: RentListing) => (
            <Grid.Col span={{ base: 18, sm: 8, lg: 6, xl: 4 }} key={rentListing.id}>
              <ListingCard {...rentListing} />
            </Grid.Col>
          ))}
          <Grid.Col span={18}>
            <Center>
              <Pagination total={pageData.totalPages} value={page} onChange={setPage} />
            </Center>
          </Grid.Col>
        </>
      ) : (
        <Grid.Col span={18}>
          <Center h={'50vh'} w={'100%'}>
            <Group>
              <Text c="dimmed" fw={500} size="lg">
                No listings found
              </Text>
            </Group>
          </Center>
        </Grid.Col>
      )}
    </Grid>
  );
};
