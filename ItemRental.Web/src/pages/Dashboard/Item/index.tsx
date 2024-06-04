import { Anchor, Box, Breadcrumbs, Grid, Loader, Title } from '@mantine/core';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '@/api';
import useApiResult from '@/hooks/useApiResult';
import RequireAuthRoute from '@/layouts/RequireAuthRoute';
import ItemView from './Components/ItemView';

const pathItems = [
  { title: 'Pagrindinis', href: '/dashboard/home' },
  { title: 'Inventorius', href: '/dashboard/inventory' },
  { title: 'Daiktas' },
].map((item, index) => (
  <Anchor href={item.href} key={index}>
    {item.title}
  </Anchor>
));

const Item = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { result: item, loading, request } = useApiResult(api.Item.get);

  useEffect(() => {
    request(id).catch(() => navigate('/dashboard/inventory'));
  }, []);

  return (
    <RequireAuthRoute fallbackPath="/login">
      <Box w="100%">
        <Grid columns={24} grow>
          <Grid.Col span={24}>
            <Title fw={700}>Inventoriaus daiktas</Title>
            <Breadcrumbs mt="xs">{pathItems}</Breadcrumbs>
          </Grid.Col>
          <Grid.Col span={24}>
            {loading ? (
              <Grid w="100%" h="100%" justify="center" align="center">
                <Loader />
              </Grid>
            ) : (
              <ItemView {...item} />
            )}
          </Grid.Col>
        </Grid>
      </Box>
    </RequireAuthRoute>
  );
};
export default Item;
