import { Navbar } from '@/components/Navbar/Navbar';
import { Flex } from '@mantine/core';
import React from 'react';

export default function Dashboard() {
  return (
    <Flex>
      <Navbar />
      <div>Content</div>
    </Flex>
  );
}
