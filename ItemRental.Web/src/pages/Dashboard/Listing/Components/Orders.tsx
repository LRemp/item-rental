import { getDateLabel } from '@/utils/Dates';
import OrderStatusLabels from '@/utils/OrderStatusLabels';
import { ScrollArea, Table, Flex, Text, Badge, ActionIcon } from '@mantine/core';
import { IconEye, IconMenu2 } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

const Element = ({ id, user, startDate, endDate, status }: Order) => (
  <Table.Tr key={id}>
    <Table.Td>
      <Text size="xs">{id}</Text>
    </Table.Td>
    <Table.Td>
      <Text size="xs" fw={600}>
        {user.name} {user.surname}
      </Text>
    </Table.Td>
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
    <Table.Td>
      <Link to={`/dashboard/orders/${id}`}>
        <ActionIcon variant="subtle" aria-label="Settings" color="gray">
          <IconEye style={{ width: '70%', height: '70%' }} stroke={1.5} />
        </ActionIcon>
      </Link>
    </Table.Td>
  </Table.Tr>
);

interface IOrdersProps {
  orders: any[] | undefined;
}

const Orders: React.FC<IOrdersProps> = ({ orders }) => {
  return (
    <>
      {orders && orders.length > 0 ? (
        <ScrollArea h={440} type="always" scrollbarSize={8}>
          <Table verticalSpacing="xs">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Užsakymo Nr.</Table.Th>
                <Table.Th>Klientas</Table.Th>
                <Table.Th>Data</Table.Th>
                <Table.Th>Būklė</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {orders.map((order: Order) => (
                <Element {...order} key={order.id} />
              ))}
            </Table.Tbody>
          </Table>
        </ScrollArea>
      ) : (
        <Flex justify="center" align="center" h="100%" w="100%">
          <Text size="md" fw={500} opacity="50%">
            Nuomos rezervacijų nerasta
          </Text>
        </Flex>
      )}
    </>
  );
};

export default Orders;
