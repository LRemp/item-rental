import { Center, Image, Paper, Table, Text } from '@mantine/core';
import NoImage from '@/assets/images/no_image.png';
import ItemActions from './ItemActions';
import ListingStatus from '@/components/Misc/ListingStatus';

const ListingTableElement: React.FC<RentListing> = ({ id, title, description, item }) => (
  <Table.Tr key={id} m="md">
    <Table.Td width="50px">
      <Center>
        <Image
          src={`/images/${item?.images?.[0]}`}
          radius="xs"
          h={50}
          w="auto"
          fit="contain"
          fallbackSrc={NoImage}
        />
      </Center>
    </Table.Td>
    <Table.Td>{title}</Table.Td>
    <Table.Td>
      <Text lineClamp={4} size="xs">
        {description}
      </Text>
    </Table.Td>
    <Table.Td>
      <ListingStatus id={id} />
    </Table.Td>
    <Table.Td>
      <ItemActions id={id} />
    </Table.Td>
  </Table.Tr>
);

interface ListingsTableProps {
  items: RentListing[];
}

const TableContainer: React.FC<ListingsTableProps> = ({ items }) => {
  const rows = items.map((item: RentListing) => <ListingTableElement {...item} key={item.id} />);

  return (
    <Paper p="md" shadow="md" radius="sm">
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th />
            <Table.Th>Pavadinimas</Table.Th>
            <Table.Th>Aprašymas</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{items && rows}</Table.Tbody>
      </Table>
    </Paper>
  );
};

export default TableContainer;
