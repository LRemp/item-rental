import api from '@/api';
import ListingUserOrders from '@/components/ListingUserOrders';
import LoginRequired from '@/components/LoginRequired';
import PhotoCarousel from '@/components/PhotoCarousel';
import { UserProfileCard } from '@/components/UserProfileCard';
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
  Loader,
  LoadingOverlay,
  Modal,
  Paper,
  Text,
  Textarea,
  Title,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconLogin } from '@tabler/icons-react';
import React from 'react';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import { useNavigate, useParams } from 'react-router-dom';

function Listing() {
  const { id } = useParams();
  const { result, loading, request } = useApiResult<RentListing>(
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
              <PhotoCarousel images={result?.item.images} />
              <Group my={12}>
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
              <UserProfileCard />
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
  const { result, loading, error, request } = useApiResult(api.Order.createOrder);
  const [opened, { open, close }] = useDisclosure(false);
  const [creating, create] = useDisclosure(false);
  const isAuthenticated = useIsAuthenticated();
  const { id } = useParams();

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
      notifications.update(
        Error({ id: notificationId, title: 'Error', message: error.description })
      );
      create.close();
    }
  };

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
              <DatePickerInput
                type="range"
                label="Pick rent period"
                placeholder="Pick rent period"
                {...form.getInputProps('date')}
              />
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
