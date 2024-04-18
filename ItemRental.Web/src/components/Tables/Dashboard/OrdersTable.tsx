import { Badge, Box, Button, Center, Group, Image, Table } from '@mantine/core';
import classes from './ItemTable.module.css';
import { useNavigate } from 'react-router-dom';
import NoImage from '@/assets/images/no_image.png';
import DeleteItemAction from '@/components/ButtonActions/DeleteItemAction';
import getDateLabel from '@/utils/Dates';
import ConfirmOrderAction from '@/components/ButtonActions/ConfirmOrderAction';
import DeclineOrderAction from '@/components/ButtonActions/DeclineOrderAction';
import labels from '@/utils/OrderStatusLabels';
import OrderMenu from '@/components/Menu/OrderMenu';

interface DashboardOrdersTableProps {
  items: Order[];
}

const DashboardOrdersTable: React.FC<DashboardOrdersTableProps> = ({ items }) => {
  const rows = items.map((item: Order) => <OrderTableElement {...item} key={item.id} />);

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Listing</Table.Th>
          <Table.Th>Client</Table.Th>
          <Table.Th>Comment</Table.Th>
          <Table.Th>Date</Table.Th>
          <Table.Th>Actions</Table.Th>
          <Table.Th>
            <Center>Status</Center>
          </Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{items && rows}</Table.Tbody>
    </Table>
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
    <Table.Tr key={id} m={'md'}>
      <Table.Td>{rentListing.title}</Table.Td>
      <Table.Td>{user.username}</Table.Td>
      <Table.Td>{comment}</Table.Td>
      <Table.Td>
        {getDateLabel(startDate)} - {getDateLabel(endDate)}
      </Table.Td>
      <Table.Td>
        <OrderMenu id={id} status={status} />
      </Table.Td>
      <Table.Td>
        <Center>
          <Badge color={labels[status as keyof typeof labels].color} variant="light" radius={'xs'}>
            {labels[status as keyof typeof labels].label}
          </Badge>
        </Center>
      </Table.Td>
    </Table.Tr>
  );
};

export default DashboardOrdersTable;
