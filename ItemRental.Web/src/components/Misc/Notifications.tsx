import api from '@/api';
import useApiResult from '@/hooks/useApiResult';
import {
  ActionIcon,
  Box,
  Flex,
  Group,
  Indicator,
  Popover,
  ScrollArea,
  Skeleton,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { IconBell, IconBellFilled, IconInfoCircle } from '@tabler/icons-react';
import React from 'react';
import classes from './Notifications.module.css';
import { useNavigate } from 'react-router-dom';
import getDateLabel from '@/utils/Dates';

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
  const { result: notifications, loading } = useApiResult(() => api.User.GetNotifications(), []);

  console.log(notifications);

  return (
    <Popover width={400} position="bottom" withArrow shadow="md">
      <Popover.Target>
        <Indicator inline color="red" size={8}>
          <ActionIcon color="black" variant="light" aria-label="Notifications">
            <IconBellFilled style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
        </Indicator>
      </Popover.Target>
      <Popover.Dropdown>
        {loading || notifications == undefined ? (
          <>
            <Box>
              <Skeleton height={12} radius={'xs'} w={'20%'} mb={'xs'} />
              <Skeleton height={12} radius={'xs'} />
            </Box>
            <Box mt={'xs'}>
              <Skeleton height={12} radius={'xs'} w={'20%'} mb={'xs'} />
              <Skeleton height={12} radius={'xs'} />
            </Box>
            <Box mt={'xs'}>
              <Skeleton height={12} radius={'xs'} w={'20%'} mb={'xs'} />
              <Skeleton height={12} radius={'xs'} />
            </Box>
          </>
        ) : (
          <ScrollArea h={400} scrollbars="y">
            {notifications.map((item: UserNotification, index: number) => (
              <Notification {...item} key={index} />
            ))}
          </ScrollArea>
        )}
      </Popover.Dropdown>
    </Popover>
  );
}

export default Notifications;

const Notification: React.FC<UserNotification> = ({ title, description, timestamp, url, read }) => {
  const navigate = useNavigate();
  return (
    <UnstyledButton w={'100%'} className={classes.notification} onClick={() => navigate(url)}>
      <Box>
        <Flex>
          <Indicator inline disabled={read} color="red" size={6}>
            <ActionIcon variant="light" aria-label="Notification">
              <IconInfoCircle></IconInfoCircle>
            </ActionIcon>
          </Indicator>
          <Text fw={500} ml="xs">
            {title}
          </Text>
        </Flex>
      </Box>
      <Box>
        <Text size="sm">{description}</Text>
        <Text fw={500} c="dimmed" size="xs">
          {getDateLabel(timestamp)}
        </Text>
      </Box>
    </UnstyledButton>
  );
};
