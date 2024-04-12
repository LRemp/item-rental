import { ActionIcon, Indicator, Popover, Text } from '@mantine/core';
import { IconBellFilled } from '@tabler/icons-react';
import React from 'react';

const mock_notifications = [
  {
    id: '1',
    code: 'Order.Delivering',
    title: 'Order dispatched',
    describe: 'The merchant has dispatched your order',
    url: '/orders/1',
    timestamp: new Date(),
    read: false,
  },
];

function Notifications() {
  return (
    <Popover width={200} position="bottom" withArrow shadow="md">
      <Popover.Target>
        <Indicator inline color="red" size={8}>
          <ActionIcon color="black" variant="light" aria-label="Notifications">
            <IconBellFilled style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
        </Indicator>
      </Popover.Target>
      <Popover.Dropdown>
        <Text size="xs">This is uncontrolled popover, it is opened when button is clicked</Text>
      </Popover.Dropdown>
    </Popover>
  );
}

export default Notifications;
