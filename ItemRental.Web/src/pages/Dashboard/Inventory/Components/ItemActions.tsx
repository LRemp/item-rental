import useAcceptOrderAction from '@/components/Actions/ConfirmOrderAction';
import useDeclineOrderAction from '@/components/Actions/DeclineOrderAction';
import useDeleteAction from '@/components/Actions/DeleteItemAction';
import { Menu, Button, rem, Text, ActionIcon } from '@mantine/core';
import {
  IconSettings,
  IconMessageCircle,
  IconPhoto,
  IconSearch,
  IconArrowsLeftRight,
  IconTrash,
  IconCheck,
  IconX,
  IconEye,
  IconMenu,
  IconMenu2,
  IconEdit,
} from '@tabler/icons-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ItemActionsProps {
  id: string;
}

const ItemActions: React.FC<ItemActionsProps> = ({ id }) => {
  const navigate = useNavigate();

  const deleteItemAction = useDeleteAction();

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
            onClick={() => navigate(`/dashboard/orders/${id}`)}
          >
            View
          </Menu.Item>
          <Menu.Item leftSection={<IconEdit style={{ width: rem(14), height: rem(14) }} />}>
            Edit
          </Menu.Item>
          <Menu.Item
            leftSection={<IconX style={{ width: rem(14), height: rem(14) }} />}
            onClick={() => deleteItemAction(id, () => navigate(`/dashboard/inventory`))}
          >
            Delete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
};

export default ItemActions;
