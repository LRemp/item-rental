import api from '@/api';
import ListingUserOrders from '@/components/Misc/ListingUserOrders';
import LoginRequired from '@/components/LoginRequired';
import PhotoCarousel from '@/components/Misc/PhotoCarousel';
import useApi from '@/hooks/useApi';
import useApiResult from '@/hooks/useApiResult';
import useAsync from '@/hooks/useAsync';
import { Error, Success } from '@/utils/Notifications';
import {
  Badge,
  Box,
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
  Text,
  Textarea,
  Title,
} from '@mantine/core';
import { DatePicker, DatePickerInput, DatePickerProps } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconLogin } from '@tabler/icons-react';
import React, { useEffect } from 'react';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import { useNavigate, useParams } from 'react-router-dom';
import NoImage from '@/assets/images/no_image.png';
import UserProfileCard from '@/components/Misc/UserProfileCard';

function Listing() {
  const { id } = useParams();
  const { result, loading } = useApiResult<RentListing>(
    () => api.RentListing.getListingById(id || ''),
    []
  );

  return (
    <Grid w={'100%'}>
      {loading ? (
        <Center h={'70vh'} w={'100%'}>
          <Group>
            <Loader></Loader>
            <Text>Loading up the listing...</Text>
          </Group>
        </Center>
      ) : (
        <>
          <Grid columns={12} w={'100%'}>
            <Grid.Col span={8}>
              {result?.item?.images?.length > 0 ? (
                <PhotoCarousel images={result?.item.images} />
              ) : (
                <Image src={NoImage} />
              )}
              <Group mt={'md'}>
                <Group justify="space-between" w={'100%'}>
                  <Title order={3} fw={600}>
                    {result?.title}
                  </Title>
                  <Badge size="20" px="10" py="15" variant="light" radius={'sm'} fw={600}>
                    {result?.price} Eur / day
                  </Badge>
                </Group>
                <div>{result?.description}</div>
              </Group>
            </Grid.Col>
            <Grid.Col span={4}>
              <UserProfileCard {...result?.renter} />
              <CreateOrderModal />
              <ListingUserOrders listingId={id || ''} />
            </Grid.Col>
          </Grid>
        </>
      )}
    </Grid>
  );
}

const CreateOrderModal = () => {
  const { id } = useParams();
  const { result, loading, error, request } = useApiResult(api.Order.createOrder);
  const {
    result: busyDates,
    loading: loadingDates,
    request: loadDates,
  } = useApiResult(api.RentListing.getBusyDates);
  const [opened, { open, close }] = useDisclosure(false);
  const [creating, create] = useDisclosure(false);
  const isAuthenticated = useIsAuthenticated();

  const form = useForm({
    initialValues: { comment: '', date: [] },
    validate: {
      date: (value) => {
        console.log(value);
        return (value.length != 2 || value[0] == null) && 'You must pick the rent period';
      },
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
    for (var index in busyDates) {
      if (
        date > new Date(busyDates[index].startDate) &&
        date < new Date(busyDates[index].endDate)
      ) {
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
                  <DatePicker
                    type="range"
                    minDate={new Date()}
                    {...form.getInputProps('date')}
                    getDayProps={getDayProps}
                  />
                )}
              </Center>

              <Textarea
                label="Comment"
                placeholder="Add the comment to the order"
                autosize
                {...form.getInputProps('comment')}
              ></Textarea>
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
