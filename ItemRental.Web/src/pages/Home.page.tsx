import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { useEffect, useState } from 'react';
import { Header } from '@/components/Nagivation/Header';
import { Container, Flex, Grid } from '@mantine/core';
import useApiResult from '@/hooks/useApiResult';
import { get } from 'http';
import api from '@/api';
import RentListing from '@/components/RentListing/RentListing';

export function HomePage() {
  return (
    <>
      <RentListingsContainer />
      {/*<Welcome />
      <ColorSchemeToggle />*/}
    </>
  );
}

const RentListingsContainer = () => {
  const { result, loading } = useApiResult(() => api.RentListing.getListings(), []);

  return (
    <Grid columns={18}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        result &&
        result?.rentListings &&
        result.rentListings.map((rentListing: RentListing) => (
          <Grid.Col span={6} key={rentListing.id}>
            <RentListing {...rentListing} />
          </Grid.Col>
        ))
      )}
    </Grid>
  );
};
