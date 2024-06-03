import { ActionIcon, Center, ScrollArea, Table, Text } from '@mantine/core';
import { IconEye } from '@tabler/icons-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getDateLabel } from '@/utils/Dates';

const OrdersTableElement: React.FC<Order> = ({ id, rentListing, user, startDate, endDate }) => {
  const navigate = useNavigate();
  return (
    <Table.Tr key={id} m="md">
      <Table.Td>{rentListing.title}</Table.Td>
      <Table.Td>{user.username}</Table.Td>
      <Table.Td>
        <Text size="xs">
          {getDateLabel(startDate)} - {getDateLabel(endDate)}
        </Text>
      </Table.Td>
      <Table.Td>
        <ActionIcon
          variant="subtle"
          aria-label="Settings"
          onClick={() => navigate(`/dashboard/orders/${id}`)}
          color="gray"
        >
          <IconEye style={{ width: '70%', height: '70%' }} stroke={1.5} />
        </ActionIcon>
      </Table.Td>
    </Table.Tr>
  );
};

interface OrdersTableProps {
  orders: Order[];
  type?: string;
  refresh?: any;
}

const OrdersTable: React.FC<OrdersTableProps> = ({ orders = [] }) => {
  const rows = orders.map((order: Order) => <OrdersTableElement {...order} key={order.id} />);

  return (
    <>
      <ScrollArea h={230}>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Skelbimas</Table.Th>
              <Table.Th>Klientas</Table.Th>
              <Table.Th>Data</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows.length > 0 && rows}</Table.Tbody>
        </Table>
        {rows.length === 0 && (
          <Center h="70%">
            <Text fw={500} size="sm" opacity="70%">
              Užsakymų nerasta
            </Text>
          </Center>
        )}
      </ScrollArea>
    </>
  );
};

export default OrdersTable;
