import {
  Badge,
  Button,
  Center,
  Fieldset,
  Grid,
  Group,
  Image,
  Loader,
  LoadingOverlay,
  Modal,
  Paper,
  Select,
  Text,
  Textarea,
  Title,
  isNumberLike,
} from '@mantine/core';
import { DatePicker, DatePickerProps, DatesProvider } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useEffect } from 'react';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import { useNavigate, useParams } from 'react-router-dom';
import { nprogress } from '@mantine/nprogress';
import NoImage from '@/assets/images/no_image.png';
import UserProfileCard from '@/components/Misc/UserProfileCard';
import { Error, Success } from '@/utils/Notifications';
import useApiResult from '@/hooks/useApiResult';
import PhotoCarousel from '@/components/Misc/PhotoCarousel';
import LoginRequired from '@/components/LoginRequired';
import ListingUserOrders from '@/components/Misc/ListingUserOrders';
import api from '@/api';
import { deliveryTypes } from '@/utils/Delivery';
import Comments from './Components/Comments';
import UserDetailsCard from '@/components/Cards/UserDetailsCard';
import ItemDetails from './Components/ItemDetails';

function Listing() {
  const { id } = useParams();
  const { result, loading } = useApiResult<RentListing>(
    () => api.RentListing.getListingById(id || ''),
    []
  );

  useEffect(() => {
    if (loading) {
      nprogress.start();
    } else {
      nprogress.complete();
    }
  }, [loading]);
  console.log(result);

  return (
    <Grid w="100%" mt="md">
      {loading ? (
        <Center h="70vh" w="100%">
          <Group>
            <Loader />
            <Text>Loading up the listing...</Text>
          </Group>
        </Center>
      ) : (
        <>
          <Grid columns={12} w="100%">
            <Grid.Col span={{ base: 12, md: 8 }}>
              <Paper shadow="md" p="md" radius="sm" mb="md">
                {result?.item?.images?.length > 0 ? (
                  <PhotoCarousel images={result?.item.images} />
                ) : (
                  <Image src={NoImage} />
                )}
                <Group mt="md">
                  <Group justify="space-between" w="100%">
                    <Title order={3} fw={600}>
                      {result?.title}
                      {result?.item?.tags && (
                        <Text>
                          {result?.item.tags.map((x: string, index: number) => (
                            <Badge variant="default" radius="xl" mr="xs" key={index}>
                              <Text fw={400} size="xs">
                                {x.toUpperCase()}
                              </Text>
                            </Badge>
                          ))}
                        </Text>
                      )}
                    </Title>

                    <Badge size="20" px="10" py="15" variant="light" radius="sm" fw={600}>
                      {result?.price} Eur / day
                    </Badge>
                  </Group>

                  <div>{result?.description}</div>
                </Group>
              </Paper>
              <Comments id={id || ''} />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Paper shadow="md" radius="sm" p="md">
                <UserDetailsCard {...result?.renter} />
              </Paper>
              <CreateOrderModal />
              <ListingUserOrders listingId={id || ''} />
              <ItemDetails {...result?.item} />
            </Grid.Col>
          </Grid>
        </>
      )}
    </Grid>
  );
}

const CreateOrderModal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { request } = useApiResult(api.Order.createOrder);
  const {
    result: busyDates,
    loading: loadingDates,
    request: loadDates,
  } = useApiResult(api.RentListing.getBusyDates);
  const [opened, { open, close }] = useDisclosure(false);
  const [creating, create] = useDisclosure(false);
  const isAuthenticated = useIsAuthenticated();

  const form = useForm({
    initialValues: { comment: '', date: [], deliveryType: undefined },
    validate: {
      date: (value) => (value.length != 2 || value[0] == null) && 'You must pick the rent period',
      deliveryType: (value) => !value && 'You must pick the delivery type',
    },
  });

  const createOrder = async (values: any) => {
    if (creating) return;
    create.open();
    const notificationId = notifications.show({
      loading: true,
      title: 'Loading',
      message: 'Creating new order...',
      autoClose: false,
      withCloseButton: false,
    });
    try {
      const createRequest = await request({
        rentListing: id,
        startDate: values.date[0],
        endDate: values.date[1],
        comment: values.comment,
        deliveryType: parseInt(values.deliveryType),
      });
      notifications.update(
        Success({
          id: notificationId,
          title: 'Success',
          message: 'Order created!',
        })
      );
      close();
      create.close();

      navigate(`/orders/${createRequest}`);
    } catch (error: any) {
      if (error.code == 'Order.DateBusy') {
        form.setFieldError('date', 'The selected date is busy!');
      }
      notifications.update(
        Error({ id: notificationId, title: 'Error', message: error.description })
      );
      create.close();
    }
  };

  const getDayProps: DatePickerProps['getDayProps'] = (date) => {
    date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    for (const index in busyDates) {
      let startDate = new Date(busyDates[index].startDate);
      startDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
      let endDate = new Date(busyDates[index].endDate);
      endDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
      if (date >= startDate && date <= endDate) {
        return {
          style: {
            backgroundColor: 'var(--mantine-color-red-filled)',
            color: 'var(--mantine-color-white)',
          },
        };
      }
    }

    return {};
  };

  useEffect(() => {
    if (opened) {
      loadDates(id);
    }
  }, [opened]);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Create item rent order"
        centered
        closeOnClickOutside={!creating}
        closeOnEscape={!creating}
        withCloseButton={!creating}
      >
        {isAuthenticated() ? (
          <form onSubmit={form.onSubmit((values) => createOrder(values))}>
            <LoadingOverlay
              visible={creating}
              zIndex={1000}
              overlayProps={{ radius: 'sm', blur: 1 }}
            />
            <Fieldset variant="unstyled">
              <Center>
                {loadingDates ? (
                  <Loader />
                ) : (
                  <DatesProvider settings={{ timezone: 'UTC' }}>
                    <DatePicker
                      type="range"
                      minDate={new Date()}
                      {...form.getInputProps('date')}
                      getDayProps={getDayProps}
                      onDateChange={(date) => console.log(date)}
                    />
                  </DatesProvider>
                )}
              </Center>

              <Textarea
                label="Comment"
                placeholder="Add the comment to the order"
                autosize
                {...form.getInputProps('comment')}
              />
              <Select
                label="Delivery type"
                placeholder="Select delivery type"
                data={deliveryTypes}
                {...form.getInputProps('deliveryType')}
              />
              <Button fullWidth mt="md" type="submit">
                Add Item
              </Button>
            </Fieldset>
          </form>
        ) : (
          <LoginRequired />
        )}
      </Modal>
      <Button fullWidth my={8} onClick={open} variant="light">
        Rent this item!
      </Button>
    </>
  );
};

export default Listing;
