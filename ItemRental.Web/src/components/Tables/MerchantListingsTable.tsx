import { Badge, Box, Button, Center, Image, Table, Text } from '@mantine/core';
import React from 'react';

import NoImage from '@/assets/images/no_image.png';
import getDateLabel from '@/utils/Dates';
import labels from '@/utils/OrderStatusLabels';
import { useNavigate } from 'react-router-dom';

interface MerchantListingsTableProps {
  elements: RentListing[];
}

const MerchantListingsTable: React.FC<MerchantListingsTableProps> = ({ elements }) => {
  const navigate = useNavigate();

  const rows = elements.map(({ id, item, title, description, price }) => (
    <Table.Tr key={id}>
      <Table.Td>
        <Center>
          <Image
            src={`/images/${item.images?.[0]}`}
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
              {title}
            </Text>
            <Badge radius={'xs'} size="sm" ml="xs">
              {price}€
            </Badge>
          </Center>
          <Text size="sm" lineClamp={2}>
            {description}
          </Text>
        </Box>
      </Table.Td>
      <Table.Td>
        <Button size="compact-sm" onClick={() => navigate(`/listing/${id}`)}>
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

export default MerchantListingsTable;
