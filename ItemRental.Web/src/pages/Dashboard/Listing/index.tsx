import { Anchor, Box, Breadcrumbs, Grid, Loader, Title } from '@mantine/core';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '@/api';
import useApiResult from '@/hooks/useApiResult';
import RequireAuthRoute from '@/layouts/RequireAuthRoute';
import ItemView from './Components/ItemView';

const pathItems = [
  { title: 'Pagrindinis', href: '/dashboard/home' },
  { title: 'Nuomos skelbimai', href: '/dashboard/listings' },
  { title: 'Nuomos skelbimas' },
].map((item, index) => (
  <Anchor href={item.href} key={index}>
    {item.title}
  </Anchor>
));

const Listing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id);
  const {
    result: listing,
    loading,
    request,
  } = useApiResult(() => api.RentListing.getMerchantListingById(id || ''), []);

  useEffect(() => {
    request(id).catch(() => navigate('/dashboard/listings'));
  }, []);

  console.log(listing);

  return (
    <RequireAuthRoute fallbackPath="/login">
      <Box w="100%">
        <Grid columns={24} grow>
          <Grid.Col span={24}>
            <Title fw={700}>Nuomos skelbimas</Title>
            <Breadcrumbs mt="xs">{pathItems}</Breadcrumbs>
          </Grid.Col>
          <Grid.Col span={24}>
            {loading ? (
              <Grid w="100%" h="100%" justify="center" align="center">
                <Loader />
              </Grid>
            ) : (
              <ItemView {...listing} />
            )}
          </Grid.Col>
        </Grid>
      </Box>
    </RequireAuthRoute>
  );
};
export default Listing;
