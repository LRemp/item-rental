import { Badge, Center, Paper, SegmentedControl, Table, Text } from '@mantine/core';
import { useState } from 'react';
import getDateLabel from '@/utils/Dates';
import labels from '@/utils/OrderStatusLabels';
import ItemActions from './ItemActions';

const OrderTableElement: React.FC<Order> = ({
  id,
  user,
  rentListing,
  startDate,
  endDate,
  comment,
  status,
}) => (
  <Table.Tr key={id} m="md">
    <Table.Td>{rentListing.title}</Table.Td>
    <Table.Td>
      <Text size="sm">
        {user.name} {user.surname}
      </Text>
      <Text c="dimmed" size="xs">
        {user.email}
      </Text>
    </Table.Td>
    <Table.Td>
      <Text lineClamp={2} size="sm">
        {comment}
      </Text>
    </Table.Td>
    <Table.Td>
      <Text size="xs">
        {getDateLabel(startDate)} - {getDateLabel(endDate)}
      </Text>
    </Table.Td>
    <Table.Td>
      <Center>
        <Badge color={labels[status as keyof typeof labels].color} variant="light" radius="xs">
          {labels[status as keyof typeof labels].label}
        </Badge>
      </Center>
    </Table.Td>
    <Table.Td>
      <ItemActions id={id} status={status} />
    </Table.Td>
  </Table.Tr>
);

interface DashboardOrdersTableProps {
  items: Order[];
}

const TableContainer: React.FC<DashboardOrdersTableProps> = ({ items }) => {
  const [type, setType] = useState<string>('0');
  const rows = items
    // eslint-disable-next-line radix, yoda
    .filter((x) => type === 'all' || x.status === parseInt(type))
    .map((item: Order) => <OrderTableElement {...item} key={item.id} />);

  const changeType = (value: string) => {
    setType(value);
  };

  return (
    <Paper radius="sm" shadow="md" p="md">
      <SegmentedControl
        value={type}
        onChange={changeType}
        color="blue"
        data={[
          { label: 'Visi', value: 'all' },
          { label: 'Laukiama patvirtinimo', value: '0' },
          { label: 'Patvirtintas', value: '1' },
          { label: 'Pristatomas', value: '2' },
          { label: 'Nuomojamas', value: '3' },
          { label: 'Grąžinamas', value: '4' },
          { label: 'Užbaigtas', value: '5' },
          { label: 'Atmestas', value: '6' },
          { label: 'Atšauktas', value: '7' },
        ]}
      />
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Skelbimas</Table.Th>
            <Table.Th>Klientas</Table.Th>
            <Table.Th>Komentaras</Table.Th>
            <Table.Th>Data</Table.Th>
            <Table.Th>
              <Center>Būsena</Center>
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{items && rows}</Table.Tbody>
      </Table>
    </Paper>
  );
};

export default TableContainer;
