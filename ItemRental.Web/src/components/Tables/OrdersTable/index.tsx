import ConfirmOrderAction from '@/components/ButtonActions/ConfirmOrderAction';
import getDateLabel from '@/utils/Dates';
import { Button, Center, Group, ScrollArea, Table, Text } from '@mantine/core';
import React from 'react';

interface OrdersTableProps {
  orders: Order[];
  type?: string;
  refresh?: any;
}

const OrdersTable: React.FC<OrdersTableProps> = ({ orders = [], type, refresh }) => {
  const rows = orders.map((order: Order) => (
    <OrdersTableElement {...order} key={order.id} type={type} refresh={refresh} />
  ));

  return (
    <>
      <ScrollArea h={230}>
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
      </ScrollArea>
    </>
  );
};

interface OrderTableElementProps extends Order {
  type?: string;
  refresh?: any;
}

const OrdersTableElement: React.FC<OrderTableElementProps> = ({
  id,
  rentListing,
  user,
  startDate,
  endDate,
  type,
  refresh,
}) => {
  return (
    <Table.Tr key={id} m={'md'}>
      <Table.Td>{rentListing.title}</Table.Td>
      <Table.Td>{user.username}</Table.Td>
      <Table.Td>
        {getDateLabel(startDate)} - {getDateLabel(endDate)}
      </Table.Td>
      <Table.Td>
        <Group>{type == 'pending' && <ConfirmOrderAction id={id} refresh={refresh} />}</Group>
      </Table.Td>
    </Table.Tr>
  );
};

export default OrdersTable;
