import { Menu, rem, ActionIcon } from '@mantine/core';
import { IconX, IconEye, IconMenu2, IconEdit } from '@tabler/icons-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ItemActionsProps {
  id: string;
}

const ItemActions: React.FC<ItemActionsProps> = ({ id }) => {
  const navigate = useNavigate();

  return (
    <>
      <ActionIcon
        variant="subtle"
        aria-label="Settings"
        onClick={() => navigate(`/dashboard/inventory/${id}`)}
        color="gray"
      >
        <IconEye style={{ width: '70%', height: '70%' }} stroke={1.5} />
      </ActionIcon>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <ActionIcon variant="subtle" aria-label="Settings" color="gray">
            <IconMenu2 style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Order actions</Menu.Label>
          <Menu.Item
            leftSection={<IconEye style={{ width: rem(14), height: rem(14) }} />}
            onClick={() => navigate(`/dashboard/listings/${id}`)}
          >
            View
          </Menu.Item>
          <Menu.Item leftSection={<IconEdit style={{ width: rem(14), height: rem(14) }} />}>
            Edit
          </Menu.Item>
          <Menu.Item leftSection={<IconX style={{ width: rem(14), height: rem(14) }} />}>
            Delete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
};

export default ItemActions;
