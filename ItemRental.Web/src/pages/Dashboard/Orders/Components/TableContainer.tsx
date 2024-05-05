import { Badge, Center, Paper, Table, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import getDateLabel from '@/utils/Dates';
import labels from '@/utils/OrderStatusLabels';
import OrderMenu from '@/components/Menu/OrderMenu';
import ItemActions from './ItemActions';

interface DashboardOrdersTableProps {
  items: Order[];
}

const TableContainer: React.FC<DashboardOrdersTableProps> = ({ items }) => {
  const rows = items.map((item: Order) => <OrderTableElement {...item} key={item.id} />);

  return (
    <Paper radius="sm" shadow="md" p="md">
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

const OrderTableElement: React.FC<Order> = ({
  id,
  user,
  rentListing,
  startDate,
  endDate,
  comment,
  status,
}) => {
  const navigate = useNavigate();
  return (
    <Table.Tr key={id} m="md">
      <Table.Td>{rentListing.title}</Table.Td>
      <Table.Td>
        <Text size="sm">{user.username}</Text>
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
};

export default TableContainer;
