import { Tabs, Box, Text } from '@mantine/core';
import { IconList } from '@tabler/icons-react';

interface ItemDetailsProps {
  details: Detail[];
}

const ItemDetails: React.FC<ItemDetailsProps> = ({ details }) => (
  <Tabs defaultValue="first">
    <Tabs.List>
      <Tabs.Tab value="first" leftSection={<IconList size={18} />}>
        Daikto ypatybės
      </Tabs.Tab>
    </Tabs.List>

    <Tabs.Panel value="first">
      {details?.length === 0 ? (
        <Text mt="md" fs="italic">
          Informacijos nerasta
        </Text>
      ) : (
        <>
          {details?.map((detail: Detail) => (
            <Box>
              <Text fw={500}>{detail.name}</Text>
              <Text>{detail.value}</Text>
            </Box>
          ))}
        </>
      )}
    </Tabs.Panel>
  </Tabs>
);

export default ItemDetails;
