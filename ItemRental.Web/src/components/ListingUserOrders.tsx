import api from '@/api';
import useApiResult from '@/hooks/useApiResult';
import getDateLabel from '@/utils/Dates';
import OrderStatusLabels from '@/utils/OrderStatusLabels';
import {
  Badge,
  Box,
  Center,
  Grid,
  Group,
  Loader,
  Paper,
  ScrollArea,
  Table,
  Text,
  Title,
} from '@mantine/core';
import React from 'react';

function ListingUserOrders({ listingId }: { listingId: string }) {
  const { result, error, loading } = useApiResult<any>(
    () => api.Order.getUserListingOrders(listingId),
    []
  );

  return (
    <Box>
      <Text size="sm" fw={600} mt={'md'} mb={'xs'}>
        Your current orders
      </Text>
      <Paper w={'100%'} radius="sm" withBorder shadow="sm">
        <ScrollArea h={164} type="always" scrollbarSize={8}>
          <Table verticalSpacing="xs">
            <Table.Tbody>
              {loading ? (
                <Box w={'100%'} h={'100%'}>
                  <Loader />
                </Box>
              ) : (
                <>
                  {result.map((item: Order) => (
                    <Element {...item} key={item.id} />
                  ))}
                </>
              )}
            </Table.Tbody>
          </Table>
        </ScrollArea>
      </Paper>
    </Box>
  );
}

const statusColor = {
  pending: 'orange',
  accepted: 'green',
  rejected: 'red',
};
const Element = ({ id, startDate, endDate, status }: Order) => {
  return (
    <Table.Tr key={id}>
      <Table.Td>
        <Text size={'xs'} fw={600}>
          {getDateLabel(startDate)} - {getDateLabel(endDate)}
        </Text>
      </Table.Td>
      <Table.Td>
        <Badge
          color={OrderStatusLabels[status as keyof typeof OrderStatusLabels].color}
          radius={'xs'}
          fullWidth
          variant="light"
        >
          {OrderStatusLabels[status as keyof typeof OrderStatusLabels].label}
        </Badge>
      </Table.Td>
    </Table.Tr>
  );
};

export default ListingUserOrders;
