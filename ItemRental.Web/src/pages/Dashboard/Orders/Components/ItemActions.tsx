import useAcceptOrderAction from '@/components/Actions/ConfirmOrderAction';
import useDeclineOrderAction from '@/components/Actions/DeclineOrderAction';
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
} from '@tabler/icons-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface OrderMenuProps {
  status: number;
  id: string;
}

const ItemActions: React.FC<OrderMenuProps> = ({ status, id }) => {
  const navigate = useNavigate();

  const acceptOrderAction = useAcceptOrderAction();
  const declineOrderAction = useDeclineOrderAction();

  return (
    <>
      <ActionIcon
        variant="subtle"
        aria-label="Settings"
        onClick={() => navigate(`/dashboard/orders/${id}`)}
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

          {status == 0 && (
            <>
              <Menu.Divider />
              <Menu.Label>Confirmation</Menu.Label>
              <Menu.Item
                leftSection={<IconCheck style={{ width: rem(14), height: rem(14) }} />}
                onClick={() => acceptOrderAction(id)}
              >
                Accept
              </Menu.Item>
              <Menu.Item
                leftSection={<IconX style={{ width: rem(14), height: rem(14) }} />}
                onClick={() => declineOrderAction(id)}
              >
                Decline
              </Menu.Item>
            </>
          )}
        </Menu.Dropdown>
      </Menu>
    </>
  );
};

export default ItemActions;
