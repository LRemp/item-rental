import { Tabs, rem } from '@mantine/core';
import { IconBoxSeam, IconList, IconListDetails } from '@tabler/icons-react';
import React from 'react';
import OrdersFromMerchantTab from '../TabContainers/OrdersFromMerchantTab';
import MerchantListingsTab from '../TabContainers/MerchantListingsTab';

interface UserProfileDetailsProps {
  id: string | undefined;
}

const UserProfileDetails: React.FC<UserProfileDetailsProps> = ({ id }) => {
  const iconStyle = { width: rem(18), height: rem(18) };

  if (id == undefined) {
    return <></>;
  }

  return (
    <Tabs defaultValue="orders">
      <Tabs.List>
        <Tabs.Tab value="orders" leftSection={<IconBoxSeam style={iconStyle} />}>
          Your orders
        </Tabs.Tab>
        <Tabs.Tab value="listings" leftSection={<IconListDetails style={iconStyle} />}>
          Merchant listings
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="orders">
        <OrdersFromMerchantTab id={id} />
      </Tabs.Panel>

      <Tabs.Panel value="listings">
        <MerchantListingsTab id={id} />
      </Tabs.Panel>
    </Tabs>
  );
};

export default UserProfileDetails;
