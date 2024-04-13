import api from '@/api';
import TimelineView from '@/components/Misc/TimelineView';
import useApiResult from '@/hooks/useApiResult';
import {
  Badge,
  Box,
  Center,
  Grid,
  Group,
  Image,
  Loader,
  Paper,
  SimpleGrid,
  Tabs,
  Text,
  Timeline,
  Title,
} from '@mantine/core';
import { Calendar, DatePickerProps } from '@mantine/dates';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GenerateEvents } from '@/utils/TimelineUtils';
import OrderReturnDelivery from '@/components/Details/Delivery/SubmitReturnDeliveryDetails';
import PhotoCarousel from '@/components/Misc/PhotoCarousel';
import NoImage from '@/assets/images/no_image.png';
import {
  IconBoxSeam,
  IconMessageCancel,
  IconPhoto,
  IconSettings,
  IconTruckDelivery,
} from '@tabler/icons-react';
import getDateLabel from '@/utils/Dates';
import { nprogress } from '@mantine/nprogress';
import ConfirmOrderDeliveryAction from '@/components/ButtonActions/ConfirmOrderDeliveryAction';
import SubmitReturnDeliveryDetailsAction from '@/components/ButtonActions/SubmitReturnDeliveryDetailsAction';
import ShippingDetailsContainer from '@/components/Details/Delivery/ShippingDetailsContainer';

const mock_events = [
  {
    title: 'Created',
    description: 'Order was created by the user',
    date: '30 minutes ago',
  },
  {
    title: 'Accepted',
    description: 'Order was accepted by the merchant',
    date: '30 minutes ago',
  },
  {
    title: 'Dispatched',
    description: 'Order package was dispatched by the merchant',
    date: '30 minutes ago',
  },
  {
    title: 'Order created',
    description: 'Order was created by the user',
    date: '30 minutes ago',
  },
];

function Order() {
  const { id } = useParams();
  const { result: order, loading } = useApiResult<Order>(() => api.Order.getOrder(id || ''), []);

  useEffect(() => {
    if (loading) {
      nprogress.start();
    } else {
      nprogress.complete();
    }
  }, [loading]);

  return (
    <>
      {loading ? (
        <Center h={'70vh'} w={'100%'}>
          <Group>
            <Loader></Loader>
            <Text>Loading up your order...</Text>
          </Group>
        </Center>
      ) : (
        <Grid columns={12} p={'lg'}>
          <Grid.Col span={12}>
            <Title my={'lg'} order={2} fw={400}>
              Order{' '}
              <Text fw={400} size="xs" c="dimmed">
                ({order.id})
              </Text>
            </Title>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 4 }}>
            <TimelineContainer events={order.events} status={order.status} />
            <DeliveryActions {...order} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 8 }}>
            <Paper>
              <ShippingDetailsContainer {...order} />
              <DetailsContainer {...order} />
            </Paper>
          </Grid.Col>
        </Grid>
      )}
    </>
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
    console.log(startDate, endDate, date, date > new Date(startDate) && date < new Date(endDate));
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
      {status == 2 && <ConfirmOrderDeliveryAction id={id} fullWidth={true} />}
      {status == 3 && <SubmitReturnDeliveryDetailsAction id={id} deliveryType={deliveryType} />}
    </Box>
  );
};

const DetailsContainer: React.FC<Order> = ({
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
