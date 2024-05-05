import { Badge, Box, Button, Center, Image, Table, Text } from '@mantine/core';
import React from 'react';

import { useNavigate } from 'react-router-dom';
import NoImage from '@/assets/images/no_image.png';
import getDateLabel from '@/utils/Dates';
import labels from '@/utils/OrderStatusLabels';

interface MerchantOrdersTableProps {
  elements: Order[];
}

const MerchantOrdersTable: React.FC<MerchantOrdersTableProps> = ({ elements }) => {
  const navigate = useNavigate();

  const rows = elements?.map(({ id, startDate, endDate, rentListing, status }) => (
    <Table.Tr key={id}>
      <Table.Td>
        <Center>
          <Image
            src={`/images/${rentListing.item.images?.[0]}`}
            radius="xs"
            h={50}
            w="auto"
            fit="contain"
            fallbackSrc={NoImage}
          />
        </Center>
      </Table.Td>
      <Table.Td>
        <Box>
          <Center inline>
            <Text fw={500} size="sm">
              {rentListing.item.name}
            </Text>
            <Badge
              color={labels[status as keyof typeof labels].color}
              radius="xs"
              size="xs"
              ml="xs"
              variant="light"
            >
              {labels[status as keyof typeof labels].label}
            </Badge>
          </Center>
          <Text size="sm" lineClamp={2}>
            {rentListing.item.description}
          </Text>
        </Box>
      </Table.Td>
      <Table.Td>
        <Text size="xs">
          {getDateLabel(startDate)} - {getDateLabel(endDate)}
        </Text>
      </Table.Td>
      <Table.Td>
        <Button size="compact-sm" onClick={() => navigate(`/orders/${id}`)}>
          View
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table>
      {elements?.length > 0 ? <Table.Tbody>{rows}</Table.Tbody> : <Text>No orders</Text>}
    </Table>
  );
};

export default MerchantOrdersTable;
