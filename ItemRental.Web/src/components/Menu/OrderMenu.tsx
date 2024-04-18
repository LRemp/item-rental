import { Menu, Button, rem, Text } from '@mantine/core';
import {
  IconSettings,
  IconMessageCircle,
  IconPhoto,
  IconSearch,
  IconArrowsLeftRight,
  IconTrash,
  IconCheck,
  IconX,
} from '@tabler/icons-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmOrderAction from '../ButtonActions/ConfirmOrderAction';
import DeclineOrderAction from '../ButtonActions/DeclineOrderAction';

interface OrderMenuProps {
  status: number;
  id: string;
}

const OrderMenu: React.FC<OrderMenuProps> = ({ status, id }) => {
  const navigate = useNavigate();
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button size="compact-sm">Actions</Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Order actions</Menu.Label>
        <Menu.Item
          leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}
          onClick={() => navigate(`/dashboard/orders/${id}`)}
        >
          View
        </Menu.Item>

        {status == 0 && (
          <>
            <Menu.Divider />
            <Menu.Label>Confirmation</Menu.Label>
            <ConfirmOrderAction
              id={id}
              button={
                <Menu.Item leftSection={<IconCheck style={{ width: rem(14), height: rem(14) }} />}>
                  Confirm
                </Menu.Item>
              }
            />
            <DeclineOrderAction
              id={id}
              button={
                <Menu.Item leftSection={<IconX style={{ width: rem(14), height: rem(14) }} />}>
                  Confirm
                </Menu.Item>
              }
            />
          </>
        )}
      </Menu.Dropdown>
    </Menu>
  );
};

export default OrderMenu;
