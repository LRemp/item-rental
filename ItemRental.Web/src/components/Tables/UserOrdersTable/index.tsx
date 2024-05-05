import { useState } from 'react';
import {
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  rem,
  keys,
  Paper,
  Badge,
  ActionIcon,
} from '@mantine/core';
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
  IconEye,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import classes from './main.module.css';
import getDateLabel from '@/utils/Dates';
import OrderStatusLabels, { GetBadgeData } from '@/utils/OrderStatusLabels';

interface RowData {
  id: string;
  title: string;
  date: string;
  status: string;
}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
  return (
    <Table.Th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
  );
}

function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].localeCompare(a[sortBy]);
      }

      return a[sortBy].localeCompare(b[sortBy]);
    }),
    payload.search
  );
}

interface UserOrdersTableProps {
  items: Order[];
}

const UserOrdersTable: React.FC<UserOrdersTableProps> = ({ items = [] }) => {
  const data = items.map((item: Order) => ({
    id: item.id,
    title: item.rentListing.title,
    date: `${getDateLabel(item.startDate)} - ${getDateLabel(item.endDate)}`,
    status: OrderStatusLabels[item.status as keyof typeof OrderStatusLabels].name,
  }));
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const navigate = useNavigate();

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
  };

  const rows = sortedData.map((row) => {
    const badge = GetBadgeData(row.status);

    return (
      <Table.Tr key={row.id}>
        <Table.Td>
          <Text size="sm">{row.title}</Text>
        </Table.Td>
        <Table.Td maw="80px">
          <Text size="xs">{row.date}</Text>
        </Table.Td>
        <Table.Td>
          <Badge color={badge.color} radius="xs" fullWidth variant="light">
            {badge.label}
          </Badge>
        </Table.Td>
        <Table.Td width="48px">
          <ActionIcon
            variant="subtle"
            aria-label="Settings"
            onClick={() => navigate(`/orders/${row.id}`)}
            color="gray"
          >
            <IconEye style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Paper radius="sm" mb="xl" mt="lg" p="md" shadow="md">
      <ScrollArea>
        <TextInput
          placeholder="Search by any field"
          mb="md"
          leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
          value={search}
          onChange={handleSearchChange}
        />
        <Table horizontalSpacing="md" verticalSpacing="xs" layout="fixed">
          <Table.Tbody>
            <Table.Tr>
              <Th
                sorted={sortBy === 'title'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('title')}
              >
                Skelbimas
              </Th>
              <Th
                sorted={sortBy === 'date'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('date')}
              >
                Data
              </Th>
              <Th
                sorted={sortBy === 'status'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('status')}
              >
                Būsena
              </Th>
              <Table.Th w="48px"> </Table.Th>
            </Table.Tr>
          </Table.Tbody>
          <Table.Tbody>
            {rows.length > 0 ? (
              rows
            ) : (
              <Table.Tr>
                <Table.Td colSpan={3}>
                  <Text fw={500} ta="center">
                    Užsakymų nerasta
                  </Text>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </ScrollArea>
    </Paper>
  );
};

export default UserOrdersTable;
