import { Box, Button, Center, Loader, Tabs, Text } from '@mantine/core';
import { IconPackageExport, IconPackageImport, IconTruckDelivery } from '@tabler/icons-react';
import React from 'react';
import api from '@/api';
import useApiResult from '@/hooks/useApiResult';
import { getTrackingLink, shippingProviders } from '@/utils/Delivery';

interface OrderComponent {
  id: string;
}

const DeliveryTab: React.FC<OrderComponent> = ({ id }) => {
  const { result: delivery, loading } = useApiResult(() => api.Delivery.get(id || '', 1), []);

  return (
    <Box>
      {loading ? (
        <Center>
          <Loader />
        </Center>
      ) : (
        <Box my="md">
          {delivery ? (
            <>
              {delivery.type === 0 && (
                <>
                  <Box>
                    <Text fw={500}>Atsiėmimo adresas:</Text>
                    <Text>{delivery.location}</Text>
                  </Box>
                </>
              )}
              {delivery.type === 1 && (
                <>
                  <Box>
                    <Text fw={500}>Pristatymo kompanija</Text>
                    <Text>
                      {
                        shippingProviders.find((item) => item.value === delivery.shippingProvider)
                          ?.label
                      }
                    </Text>
                  </Box>
                  <Box>
                    <Text fw={500}>Sekimo ID</Text>
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
                    Atverti pristatymo stebėjimą <IconTruckDelivery stroke={1.0} />
                  </Button>
                </>
              )}
            </>
          ) : (
            <Text fs="italic" fw={500} size="sm">
              Pristatymo informacija nerasta
            </Text>
          )}
        </Box>
      )}
    </Box>
  );
};

const ReturnTab: React.FC<OrderComponent> = ({ id }) => {
  const { result: delivery, loading } = useApiResult(() => api.Delivery.get(id || '', 0), []);

  return (
    <Box>
      {loading ? (
        <Center>
          <Loader />
        </Center>
      ) : (
        <Box my="md">
          {delivery ? (
            <>
              {delivery.type === 0 && (
                <>
                  <Box>
                    <Text fw={500}>Atsiėmimo adresas:</Text>
                    <Text>{delivery.location}</Text>
                  </Box>
                </>
              )}
              {delivery.type === 1 && (
                <>
                  <Box>
                    <Text fw={500}>Pristatymo kompanija</Text>
                    <Text>
                      {
                        shippingProviders.find((item) => item.value === delivery.shippingProvider)
                          ?.label
                      }
                    </Text>
                  </Box>
                  <Box>
                    <Text fw={500}>Sekimo ID</Text>
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
                    Atverti pristatymo stebėjimą <IconTruckDelivery stroke={1.0} />
                  </Button>
                </>
              )}
            </>
          ) : (
            <Text fs="italic" fw={500} size="sm">
              Grąžinimo informacija nerasta
            </Text>
          )}
        </Box>
      )}
    </Box>
  );
};

const ShippingDetailsContainer: React.FC<Order> = ({ status, id }) => (
  <>
    {status > 0 && (
      <Tabs defaultValue="delivery">
        <Tabs.List>
          <Tabs.Tab value="delivery" leftSection={<IconPackageExport size={18} />}>
            Pristatymo informacija
          </Tabs.Tab>
          {status > 3 && (
            <Tabs.Tab value="return" leftSection={<IconPackageImport size={18} />}>
              Grąžinimo informacija
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

export default ShippingDetailsContainer;
