import api from '@/api';
import ListingCard from '@/components/ListingCard/ListingCard';
import useApiResult from '@/hooks/useApiResult';
import { Center, Container, Grid, Loader, Popover, Text, TextInput, rem } from '@mantine/core';
import { useDebouncedState } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';

const Search: React.FC = () => {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [value, setValue] = useDebouncedState('', 500);

  const { result: data, loading, request } = useApiResult(api.RentListing.getListings);

  useEffect(() => {
    request({ searchArgument: value });
  }, [value]);

  return (
    <>
      <Popover opened={popoverOpened} position="bottom">
        <Popover.Target>
          <div
            onFocusCapture={() => setPopoverOpened(true)}
            onBlurCapture={() => setPopoverOpened(false)}
          >
            <TextInput
              placeholder="Search..."
              leftSection={<IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
              size="md"
              onInput={(event) => setValue(event.currentTarget.value)}
            />
          </div>
        </Popover.Target>
        <Popover.Dropdown>
          {value.length > 0 && (
            <Container>
              {loading ? (
                <Loader />
              ) : (
                <Grid columns={12} py={'sm'}>
                  <Grid.Col span={12}>
                    <Center>
                      <Text fw={500}>Search results:</Text>
                    </Center>
                  </Grid.Col>
                  {data?.rentListings?.length > 0 ? (
                    data.rentListings.map((item: any) => (
                      <Grid.Col span={3}>
                        <ListingCard {...item} highlight={value} />
                      </Grid.Col>
                    ))
                  ) : (
                    <Grid.Col span={12}>
                      <Center>
                        <Text c="dimmed">No results found</Text>
                      </Center>
                    </Grid.Col>
                  )}
                </Grid>
              )}
            </Container>
          )}
        </Popover.Dropdown>
      </Popover>
    </>
  );
};

export default Search;
