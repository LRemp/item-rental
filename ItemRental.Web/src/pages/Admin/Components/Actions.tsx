import { Paper, Tabs, rem } from '@mantine/core';
import { IconPhoto, IconMessageCircle, IconSettings } from '@tabler/icons-react';
import Categories from './Categories';
import VerificationRequests from './VerificationRequests';

const Actions: React.FC = () => {
  const iconStyle = { width: rem(12), height: rem(12) };

  return (
    <Paper shadow="md" radius="sm" p="md">
      <Tabs defaultValue="verification">
        <Tabs.List>
          <Tabs.Tab value="verification" leftSection={<IconPhoto style={iconStyle} />}>
            Profile verification requests
          </Tabs.Tab>
          <Tabs.Tab value="categories" leftSection={<IconMessageCircle style={iconStyle} />}>
            Categories
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="verification">
          <VerificationRequests />
        </Tabs.Panel>

        <Tabs.Panel value="categories">
          <Categories />
        </Tabs.Panel>
      </Tabs>
    </Paper>
  );
};

export default Actions;
