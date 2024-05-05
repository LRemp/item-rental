import { Anchor, Grid, Title, Text } from '@mantine/core';
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => (
    <Grid w="100%" h="100%" justify="center" align="center">
      <Title>404</Title>
      <Text>The requested resource was not found</Text>
      <Link to="/dashboard">Return to dashboard</Link>
    </Grid>
  );

export default NotFound;
