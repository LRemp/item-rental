import { Center, Image, Paper, Table } from '@mantine/core';
import NoImage from '@/assets/images/no_image.png';
import ItemActions from './ItemActions';

const ItemTableElement: React.FC<Item> = ({ id, name, description, images, tags }) => (
  <Table.Tr key={id} m="md">
    <Table.Td width="50px">
      <Center>
        <Image
          src={`/images/${images?.[0]}`}
          radius="xs"
          h={50}
          w="auto"
          fit="contain"
          fallbackSrc={NoImage}
        />
      </Center>
    </Table.Td>
    <Table.Td>{name}</Table.Td>
    <Table.Td>{description}</Table.Td>
    <Table.Td>{tags}</Table.Td>
    <Table.Td>
      <ItemActions id={id} />
    </Table.Td>
  </Table.Tr>
);

interface ItemsListProps {
  items: Item[];
}

const TableContainer: React.FC<ItemsListProps> = ({ items }) => {
  const rows = items.map((item: Item) => <ItemTableElement {...item} key={item.id} />);

  return (
    <Paper shadow="md" radius="sm" p="md">
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th />
            <Table.Th>Pavadinimas</Table.Th>
            <Table.Th>Aprašymas</Table.Th>
            <Table.Th>Žymės</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{items && rows}</Table.Tbody>
      </Table>
    </Paper>
  );
};

export default TableContainer;
