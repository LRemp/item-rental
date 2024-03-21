import { Button, Group, Table } from '@mantine/core';
import classes from './ItemTable.module.css';
import { useNavigate } from 'react-router-dom';

interface ItemsListProps {
  items: Item[];
}

const ItemTable: React.FC<ItemsListProps> = ({ items }) => {
  const rows = items.map((item: Item) => <ItemTableElement {...item} key={item.id} />);

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th></Table.Th>
          <Table.Th>Name</Table.Th>
          <Table.Th>Description</Table.Th>
          <Table.Th>Tags</Table.Th>
          <Table.Th>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{items && rows}</Table.Tbody>
    </Table>
  );
};

const ItemTableElement: React.FC<Item> = ({ id, name, description, category, images, tags }) => {
  const navigate = useNavigate();
  return (
    <Table.Tr key={id} m={'md'}>
      <Table.Td>{images && <img width={80} src={`/images/${images[0]}`}></img>}</Table.Td>
      <Table.Td>{name}</Table.Td>
      <Table.Td>{description}</Table.Td>
      <Table.Td>{tags}</Table.Td>
      <Table.Td>
        <Group>
          <Button color="blue" onClick={() => navigate(`/dashboard/item/${id}`)}>
            View
          </Button>
          <Button color="yellow">Edit</Button>
          <Button color="red">Delete</Button>
        </Group>
      </Table.Td>
    </Table.Tr>
  );
};

export default ItemTable;
