import { Button, Center, Group, Image, Table } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import NoImage from '@/assets/images/no_image.png';
import DeleteItemAction from '@/components/ButtonActions/DeleteItemAction';

const ListingTableElement: React.FC<RentListing> = ({ id, title, description, item }) => {
  const navigate = useNavigate();
  return (
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
      <Table.Td>{description}</Table.Td>
      <Table.Td>
        <Group gap="xs">
          <Button
            color="blue"
            onClick={() => navigate(`/dashboard/inventory/${id}`)}
            size="compact-sm"
          >
            View
          </Button>
          <Button color="yellow" size="compact-sm">
            Edit
          </Button>
          <DeleteItemAction id={id} />
        </Group>
      </Table.Td>
    </Table.Tr>
  );
};

interface ListingsTableProps {
  items: RentListing[];
}

const ListingsTable: React.FC<ListingsTableProps> = ({ items }) => {
  const rows = items.map((item: RentListing) => <ListingTableElement {...item} key={item.id} />);

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th />
          <Table.Th>Name</Table.Th>
          <Table.Th>Description</Table.Th>
          <Table.Th>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{items && rows}</Table.Tbody>
    </Table>
  );
};

export default ListingsTable;
