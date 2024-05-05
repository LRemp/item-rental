import {
  Box,
  Center,
  Container,
  Group,
  Loader,
  Popover,
  Text,
  TextInput,
  rem,
} from '@mantine/core';
import { useDebouncedState } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import React, { useEffect } from 'react';
import useApiResult from '@/hooks/useApiResult';
import ListingCard from '@/components/ListingCard/ListingCard';
import api from '@/api';

const Search: React.FC = () => {
  const [value, setValue] = useDebouncedState('', 500);

  const { result: data, loading, request } = useApiResult(api.RentListing.getListings);

  useEffect(() => {
    request({ searchArgument: value });
  }, [value]);

  return (
    <>
      <Popover position="bottom" withArrow shadow="md">
        <Popover.Target>
          <TextInput
            placeholder="Search..."
            leftSection={<IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
            size="md"
            onInput={(event) => setValue(event.currentTarget.value)}
          />
        </Popover.Target>
        <Popover.Dropdown>
          {value.length > 0 ? (
            <Container>
              {loading ? (
                <Loader />
              ) : (
                <Box>
                  <Center>
                    <Text fw={500} size="lg" mb="md">
                      Search results:
                    </Text>
                  </Center>
                  <Group>
                    {data?.result?.length > 0 ? (
                      data.result.map((item: any) => (
                        <ListingCard {...item} highlight={value} w="280px" />
                      ))
                    ) : (
                      <Center>
                        <Text c="dimmed">No results found</Text>
                      </Center>
                    )}
                  </Group>
                </Box>
              )}
            </Container>
          ) : (
            <Box>
              <Text c="dimmed" fs="italic" fw={500} size="sm">
                Enter a text to begin the search
              </Text>
            </Box>
          )}
        </Popover.Dropdown>
      </Popover>
    </>
  );
};

export default Search;
