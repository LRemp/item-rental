import { Badge, Box, Flex, Loader, Paper, ScrollArea, Table, Text } from '@mantine/core';
import React from 'react';
import api from '@/api';
import useApiResult from '@/hooks/useApiResult';
import getDateLabel from '@/utils/Dates';
import OrderStatusLabels from '@/utils/OrderStatusLabels';

const Element = ({ id, startDate, endDate, status }: Order) => (
  <Table.Tr key={id}>
    <Table.Td>
      <Text size="xs" fw={600}>
        {getDateLabel(startDate)} - {getDateLabel(endDate)}
      </Text>
    </Table.Td>
    <Table.Td>
      <Badge
        color={OrderStatusLabels[status as keyof typeof OrderStatusLabels].color}
        radius="xs"
        fullWidth
        variant="light"
      >
        {OrderStatusLabels[status as keyof typeof OrderStatusLabels].label}
      </Badge>
    </Table.Td>
  </Table.Tr>
);

function ListingUserOrders({ listingId }: { listingId: string }) {
  const { result, loading } = useApiResult(() => api.Order.getUserListingOrders(listingId), []);

  return (
    <Box>
      <Text size="sm" fw={600} mt="md" mb="xs">
        Jūsų rezervacijos
      </Text>
      <Paper w="100%" radius="sm" shadow="md" h={164}>
        {loading ? (
          <Flex justify="center" align="center" h="100%" w="100%">
            <Loader />
          </Flex>
        ) : result && result.length > 0 ? (
          <ScrollArea h={164} type="always" scrollbarSize={8}>
            <Table verticalSpacing="xs">
              <Table.Tbody>
                {result.map((item: Order) => (
                  <Element {...item} key={item.id} />
                ))}
              </Table.Tbody>
            </Table>
          </ScrollArea>
        ) : (
          <Flex justify="center" align="center" h="100%" w="100%">
            <Text size="md" fw={500} opacity="50%">
              Rezervacijų nerasta
            </Text>
          </Flex>
        )}
      </Paper>
    </Box>
  );
}

export default ListingUserOrders;
