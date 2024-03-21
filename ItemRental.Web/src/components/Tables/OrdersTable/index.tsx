import getDateLabel from '@/utils/Dates';
import { Button, Center, Group, Table, Text } from '@mantine/core';
import React from 'react';

interface OrdersTableProps {
  orders: Order[];
}

const OrdersTable: React.FC<OrdersTableProps> = ({ orders = [] }) => {
  const rows = orders.map((order: Order) => <OrdersTableElement {...order} key={order.id} />);

  return (
    <>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Title</Table.Th>
            <Table.Th>Username</Table.Th>
            <Table.Th>Date</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows.length > 0 && rows}</Table.Tbody>
      </Table>
      {rows.length === 0 && (
        <Center h={'70%'}>
          <Text fw={500} size="sm" opacity={'70%'}>
            No orders found
          </Text>
        </Center>
      )}
    </>
  );
};

const OrdersTableElement: React.FC<Order> = ({ id, rentListing, user, startDate, endDate }) => {
  return (
    <Table.Tr key={id} m={'md'}>
      <Table.Td>{rentListing.title}</Table.Td>
      <Table.Td>{user.username}</Table.Td>
      <Table.Td>
        {getDateLabel(startDate)} - {getDateLabel(endDate)}
      </Table.Td>
      <Table.Td>
        <Group>
          <Button color="blue">View</Button>
        </Group>
      </Table.Td>
    </Table.Tr>
  );
};

export default OrdersTable;
