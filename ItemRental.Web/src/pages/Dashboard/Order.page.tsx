import api from '@/api';
import OrderReturnDelivery from '@/components/Details/Delivery/SubmitReturnDeliveryDetails';
import PhotoCarousel from '@/components/Misc/PhotoCarousel';
import TimelineView from '@/components/Misc/TimelineView';
import DashboardOrdersTable from '@/components/Tables/Dashboard/OrdersTable';
import useApiResult from '@/hooks/useApiResult';
import getDateLabel from '@/utils/Dates';
import { GenerateEvents } from '@/utils/TimelineUtils';
import {
  Anchor,
  Badge,
  Box,
  Breadcrumbs,
  Button,
  Center,
  Container,
  Grid,
  Group,
  Image,
  Loader,
  Paper,
  Tabs,
  Text,
  Title,
} from '@mantine/core';
import { Calendar, DatePickerProps } from '@mantine/dates';
import { IconBoxSeam, IconTruckDelivery } from '@tabler/icons-react';
import React from 'react';
import NoImage from '@/assets/images/no_image.png';
import { useParams } from 'react-router-dom';
import ConfirmOrderAction from '@/components/ButtonActions/ConfirmOrderAction';
import DeclineOrderAction from '@/components/ButtonActions/DeclineOrderAction';
import SubmitDeliveryDetails from '@/components/Details/Delivery/SubmitDeliveryDetails';
import ShippingDetailsContainer from '@/components/Details/Delivery/ShippingDetailsContainer';
import SubmitDeliveryDetailsAction from '@/components/ButtonActions/SubmitDeliveryDetailsAction';
import ConfirmReturnDeliveryAction from '@/components/ButtonActions/ConfirmReturnDeliveryAction';

const pathItems = [{ title: 'Dashboard', href: '/dashboard' }, { title: 'Orders' }].map(
  (item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  )
);

function Order() {
  const { id } = useParams();
  const { result: order, loading } = useApiResult(() => api.Order.getOrder(id || ''), []);

  return (
    <Box w={'100%'}>
      <Grid columns={24} grow>
        <Grid.Col span={24}>
          <Grid justify="space-between" align="flex-end">
            <Grid.Col>
              <Title fw={400} order={2}>
                Order
              </Title>
              <Text c="dimmed" size="xs" fw={500}>
                {id}
              </Text>
              <Breadcrumbs mt={'xs'}>{pathItems}</Breadcrumbs>
            </Grid.Col>
          </Grid>
          <Box></Box>
        </Grid.Col>
        <Grid.Col span={24}>
          <Paper>
            {loading ? (
              <Center>
                <Loader />
              </Center>
            ) : (
              <Box maw={'960px'}>
                <Grid columns={12} p={'lg'}>
                  <Grid.Col span={{ base: 12, md: 4 }}>
                    <TimelineContainer events={order.events} status={order.status} />
                    <DeliveryActions {...order} />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, md: 8 }}>
                    <Paper>
                      <ShippingDetailsContainer {...order} />
                      <DetailsContainer {...order} />
                    </Paper>
                  </Grid.Col>
                </Grid>
              </Box>
            )}
          </Paper>
        </Grid.Col>
      </Grid>
    </Box>
  );
}

export default Order;

interface TimelineContainerProps {
  events: EventLog[];
  status: OrderStatus;
}

const TimelineContainer: React.FC<TimelineContainerProps> = ({ events, status }) => {
  const timelineEvents = GenerateEvents(events, status);
  return (
    <>
      <TimelineView events={timelineEvents} active={events.length - 1} />
    </>
  );
};

interface OrderCalendarProps {
  startDate: string;
  endDate: string;
}

const OrderCalendar: React.FC<OrderCalendarProps> = ({ startDate, endDate }) => {
  const getDayProps: DatePickerProps['getDayProps'] = (date) => {
    if (date > new Date(startDate) && date < new Date(endDate)) {
      return {
        style: {
          backgroundColor: 'var(--mantine-color-blue-filled)',
          color: 'var(--mantine-color-white)',
        },
      };
    }

    return {};
  };

  return (
    <Box>
      <Calendar defaultDate={new Date(startDate)} getDayProps={getDayProps} hasNextLevel={false} />
    </Box>
  );
};

const DeliveryActions: React.FC<Order> = ({ id, status, deliveryType }) => {
  return (
    <Box mt={'lg'}>
      {status == 0 && (
        <Group>
          <ConfirmOrderAction id={id} size={'sm'} />
          <DeclineOrderAction id={id} size={'sm'} />
        </Group>
      )}
      {(status == 1 || status == 2) && (
        <SubmitDeliveryDetailsAction id={id} deliveryType={deliveryType} />
      )}
      {status == 4 && <ConfirmReturnDeliveryAction id={id} />}
    </Box>
  );
};

const DetailsContainer: React.FC<Order> = ({
  user,
  comment,
  startDate,
  endDate,
  rentListing,
  deliveryType,
}) => {
  return (
    <Tabs defaultValue="order">
      <Tabs.List>
        <Tabs.Tab value="order" leftSection={<IconTruckDelivery size={26} stroke={1.5} />}>
          Order details
        </Tabs.Tab>
        <Tabs.Tab value="listing" leftSection={<IconBoxSeam size={26} stroke={1.5} />}>
          Listing details
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="order">
        <Grid columns={12} mt={'md'}>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Box>
              <Box>
                <Text fw={500}>Client</Text>
                <Text>{user.username}</Text>
              </Box>
              <Box>
                <Text fw={500}>Rent date</Text>
                <Text>
                  {getDateLabel(startDate)} - {getDateLabel(endDate)}
                </Text>
              </Box>
              <Box>
                <Text fw={500}>Comment</Text>
                <Text>{comment}</Text>
              </Box>
              <Box>
                <Text fw={500}>Delivery type</Text>
                <Badge radius={'xs'} size="md">
                  {deliveryType == 0 ? 'Pickup' : 'Shippment'}
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
        <ListingDetails listing={rentListing.id} />
      </Tabs.Panel>
    </Tabs>
  );
};

interface ListingDetailsProps {
  listing: string;
}

const ListingDetails: React.FC<ListingDetailsProps> = ({ listing }) => {
  const { result: data, loading } = useApiResult(() => api.RentListing.getListingById(listing), []);
  return (
    <Grid columns={12} mt={'sm'}>
      <Grid.Col span={{ base: 12, sm: 6 }}></Grid.Col>
      <Grid.Col span={{ base: 12, sm: 6 }}>
        {data?.item?.images?.length > 0 ? (
          <PhotoCarousel images={data?.item.images} />
        ) : (
          <Image src={NoImage} />
        )}
      </Grid.Col>
    </Grid>
  );
};
