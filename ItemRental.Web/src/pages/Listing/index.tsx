/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
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
  Select,
  Text,
  Textarea,
  Title,
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
      date: (value) =>
        (value.length !== 2 || value[0] == null) && 'Privalote pasirinkti nuomos datą',
      deliveryType: (value) => !value && 'Privalote pasirinkti pristatymo tipą',
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
        // eslint-disable-next-line radix
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

      navigate(`/orders/${createRequest.id}`);
    } catch (error: any) {
      if (error.code === 'Order.DateBusy') {
        form.setFieldError('date', 'The selected date is busy!');
      }
      console.log(error);
      notifications.update(
        Error({ id: notificationId, title: 'Error', message: error.description })
      );
      create.close();
    }
  };

  const getDayProps: DatePickerProps['getDayProps'] = (date) => {
    // eslint-disable-next-line no-param-reassign
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
        title="Sukurti nuomos rezervaciją"
        centered
        closeOnClickOutside={!creating}
        closeOnEscape={!creating}
        withCloseButton={!creating}
      >
        {isAuthenticated ? (
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
                    />
                  </DatesProvider>
                )}
              </Center>

              <Textarea
                label="Komentaras"
                placeholder="Pridėkite komentarą"
                autosize
                {...form.getInputProps('comment')}
              />
              <Select
                label="Pristatymo tipas"
                placeholder="Pasirinkite pristatymo tipą"
                data={deliveryTypes}
                {...form.getInputProps('deliveryType')}
              />
              <Button fullWidth mt="md" type="submit">
                Sukurti rezervaciją
              </Button>
            </Fieldset>
          </form>
        ) : (
          <LoginRequired />
        )}
      </Modal>
      <Button id="create-reservation" fullWidth my={8} onClick={open} variant="light">
        Atlikti rezervaciją
      </Button>
    </>
  );
};

function Listing() {
  const { id } = useParams();
  const { result, loading } = useApiResult(() => api.RentListing.getListingById(id || ''), []);

  useEffect(() => {
    if (loading) {
      nprogress.start();
    } else {
      nprogress.complete();
    }
  }, [loading]);

  return (
    <Grid w="100%" mt="md">
      {loading ? (
        <Center h="70vh" w="100%">
          <Group>
            <Loader />
            <Text>Kraunamas skelbimas...</Text>
          </Group>
        </Center>
      ) : (
        <>
          <Grid columns={12} w="100%">
            <Grid.Col span={{ base: 12, md: 8 }}>
              <Paper shadow="md" p="md" radius="sm" mb="md">
                <Box>
                  {result?.item?.images?.length > 0 ? (
                    <PhotoCarousel images={result?.item.images} />
                  ) : (
                    <Image src={NoImage} />
                  )}
                </Box>
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
                      {result?.price}€ / dienai
                    </Badge>
                  </Group>

                  <div>{result?.description}</div>
                </Group>
              </Paper>
              <Comments id={id || ''} />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Paper shadow="md" radius="sm" p="md">
                <UserDetailsCard {...result?.renter} hasButton={1} />
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

export default Listing;
