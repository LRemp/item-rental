import api from '@/api';
import useApiResult from '@/hooks/useApiResult';
import { getTrackingLink, shippingProviders } from '@/utils/Delivery';
import { Box, Button, Center, Loader, Tabs, Text } from '@mantine/core';
import { IconPackageExport, IconPackageImport, IconTruckDelivery } from '@tabler/icons-react';
import React from 'react';

const ShippingDetailsContainer: React.FC<Order> = ({ status, id }) => {
  return (
    <>
      {status > 0 && (
        <Tabs defaultValue="delivery">
          <Tabs.List>
            <Tabs.Tab value="delivery" leftSection={<IconPackageExport size={18} />}>
              Delivery details
            </Tabs.Tab>
            {status > 3 && (
              <Tabs.Tab value="return" leftSection={<IconPackageImport size={18} />}>
                Return details
              </Tabs.Tab>
            )}
          </Tabs.List>

          <Tabs.Panel value="delivery">
            <DeliveryTab id={id} />
          </Tabs.Panel>

          {status > 3 && (
            <Tabs.Panel value="return">
              <ReturnTab id={id} />
            </Tabs.Panel>
          )}
        </Tabs>
      )}
    </>
  );
};

export default ShippingDetailsContainer;

interface OrderComponent {
  id: string;
}

const DeliveryTab: React.FC<OrderComponent> = ({ id }) => {
  const { result: delivery, loading } = useApiResult(() => api.Delivery.get(id || ''), []);
  console.log(delivery);
  return (
    <Box>
      {loading ? (
        <Center>
          <Loader />
        </Center>
      ) : (
        <Box my={'md'}>
          {delivery ? (
            <>
              {delivery.type == 0 && (
                <>
                  <Box>
                    <Text fw={500}>Pickup location:</Text>
                    <Text>{delivery.location}</Text>
                  </Box>
                </>
              )}
              {delivery.type == 1 && (
                <>
                  <Box>
                    <Text fw={500}>Shipping company</Text>
                    <Text>
                      {
                        shippingProviders.find((item) => item.value == delivery.shippingProvider)
                          ?.label
                      }
                    </Text>
                  </Box>
                  <Box>
                    <Text fw={500}>Tracking id</Text>
                    <Text>{delivery.shippingId}</Text>
                  </Box>
                  <Button
                    onClick={() =>
                      window.open(
                        getTrackingLink(delivery.shippingProvider, delivery.shippingId),
                        '_blank',
                        'norefferer'
                      )
                    }
                  >
                    Open package tracking <IconTruckDelivery stroke={1.0} />
                  </Button>
                </>
              )}
            </>
          ) : (
            <Text fs="italic" fw={500} size={'sm'}>
              No delivery details found
            </Text>
          )}
        </Box>
      )}
    </Box>
  );
};

const ReturnTab: React.FC<OrderComponent> = ({ id }) => {
  return <Box></Box>;
};
