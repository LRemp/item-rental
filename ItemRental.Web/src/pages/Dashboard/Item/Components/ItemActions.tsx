import CreateListingAction from '@/components/ButtonActions/CreateListingAction';
import { Group } from '@mantine/core';

interface ItemActionsProps {
  id: string;
}

const ItemActions: React.FC<ItemActionsProps> = ({ id }) => (
  <Group mb="md">
    <CreateListingAction id={id} />
  </Group>
);

export default ItemActions;
