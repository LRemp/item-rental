import {
  Anchor,
  Badge,
  Box,
  Breadcrumbs,
  Center,
  Grid,
  Group,
  Loader,
  Paper,
  Tabs,
  Text,
  Title,
} from '@mantine/core';
import { IconBoxSeam, IconTruckDelivery } from '@tabler/icons-react';
import React from 'react';
import { useParams } from 'react-router-dom';
import api from '@/api';
import TimelineView from '@/components/Misc/TimelineView';
import useApiResult from '@/hooks/useApiResult';
import getDateLabel from '@/utils/Dates';
import { GenerateEvents } from '@/utils/TimelineUtils';

import ConfirmOrderAction from '@/components/ButtonActions/ConfirmOrderAction';
import ShippingDetailsContainer from '@/components/Details/Delivery/ShippingDetailsContainer';
import SubmitDeliveryDetailsAction from '@/components/ButtonActions/SubmitDeliveryDetailsAction';
import ConfirmReturnDeliveryAction from '@/components/ButtonActions/ConfirmReturnDeliveryAction';
import labels from '@/utils/OrderStatusLabels';
import ListingDetailsTab from '@/components/TabContainers/ListingDetailsTab';
import OrderCalendar from '@/components/Misc/OrderCalendar';
import ChatWindow from '../../../components/Window/ChatWindow';

const pathItems = [{ title: 'Pagrindinis', href: '/dashboard/home' }, { title: 'Užsakymai' }].map(
  (item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  )
);

interface TimelineContainerProps {
  events: EventLog[];
}

const TimelineContainer: React.FC<TimelineContainerProps> = ({ events }) => {
  const timelineEvents = GenerateEvents(events);
  return (
    <>
      <TimelineView events={timelineEvents} active={events.length - 1} />
    </>
  );
};

const DeliveryActions: React.FC<Order> = ({ id, status, deliveryType }) => (
  <Box mt="lg">
    {status === 0 && (
      <Group>
        <ConfirmOrderAction id={id} />
      </Group>
    )}
    {(status === 1 || status === 2) && (
      <SubmitDeliveryDetailsAction id={id} deliveryType={deliveryType} />
    )}
    {status === 4 && <ConfirmReturnDeliveryAction id={id} />}
  </Box>
);

const DetailsContainer: React.FC<Order> = ({
  user,
  comment,
  startDate,
  endDate,
  rentListing,
  deliveryType,
}) => (
  <Tabs defaultValue="order">
    <Tabs.List>
      <Tabs.Tab value="order" leftSection={<IconTruckDelivery size={26} stroke={1.5} />}>
        Užsakymo informacija
      </Tabs.Tab>
      <Tabs.Tab value="listing" leftSection={<IconBoxSeam size={26} stroke={1.5} />}>
        Skelbimo informacija
      </Tabs.Tab>
    </Tabs.List>

    <Tabs.Panel value="order">
      <Grid columns={12} mt="md">
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Box>
            <Box>
              <Text fw={500}>Klientas</Text>
              <Text>
                {user.name} {user.surname}
              </Text>
              <Text c="dimmed" size="xs">
                {user.email}
              </Text>
            </Box>
            <Box>
              <Text fw={500}>Nuomos data</Text>
              <Text>
                {getDateLabel(startDate)} - {getDateLabel(endDate)}
              </Text>
            </Box>
            <Box>
              <Text fw={500}>Komentaras</Text>
              <Text>{comment}</Text>
            </Box>
            <Box>
              <Text fw={500}>Pristatymo tipas</Text>
              <Badge radius="xs" size="md">
                {deliveryType === 0 ? 'Atsiimti' : 'Siuntimas'}
              </Badge>
            </Box>
          </Box>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <OrderCalendar startDate={startDate} endDate={endDate} />
        </Grid.Col>
      </Grid>
    </Tabs.Panel>

    <Tabs.Panel value="listing">
      <ListingDetailsTab id={rentListing.id} />
    </Tabs.Panel>
  </Tabs>
);

function Order() {
  const { id } = useParams();
  const { result: order, loading } = useApiResult(() => api.Order.getOrder(id || ''), []);

  return (
    <Box w="100%">
      <Grid columns={24} grow>
        <Grid.Col span={24}>
          <Grid justify="space-between" align="flex-end">
            <Grid.Col>
              <Group justify="space-between">
                <Title fw={700}>
                  <Center inline>
                    Užsakymas
                    {order && (
                      <Badge
                        color={labels[order?.status as keyof typeof labels].color}
                        radius="xs"
                        size="md"
                        ml="sm"
                      >
                        {labels[order?.status as keyof typeof labels].label}
                      </Badge>
                    )}
                  </Center>
                </Title>
              </Group>
              <Text c="dimmed" size="xs" fw={500}>
                {id}
              </Text>
              <Breadcrumbs mt="xs">{pathItems}</Breadcrumbs>
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col span={24}>
          {loading ? (
            <Center>
              <Loader />
            </Center>
          ) : (
            <Grid columns={16}>
              <Grid.Col span={{ base: 16, md: 4 }}>
                <Paper p="lg" shadow="md" radius="sm">
                  <TimelineContainer events={order.events} />
                  <DeliveryActions {...order} />
                </Paper>
              </Grid.Col>
              <Grid.Col span={{ base: 16, md: 8 }}>
                <Paper p="lg" shadow="md" radius="sm">
                  <ShippingDetailsContainer {...order} />
                  <DetailsContainer {...order} />
                </Paper>
              </Grid.Col>
              <Grid.Col span={{ base: 16, md: 4 }}>
                <ChatWindow />
              </Grid.Col>
            </Grid>
          )}
        </Grid.Col>
      </Grid>
    </Box>
  );
}

export default Order;
