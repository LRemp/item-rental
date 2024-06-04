import { Box, Group, Paper, Text, Title } from '@mantine/core';

interface IDetailRow {
  label: string;
  value: string;
}

const DetailRow: React.FC<IDetailRow> = ({ label, value }) => (
  <Group justify="space-between">
    <Text fw={500}>{label}:</Text>
    <Text>{value}</Text>
  </Group>
);

const ItemDetails: React.FC<Item> = ({ details, category }) => (
  <Box>
    <Text size="sm" fw={600} mt="md" mb="xs">
      Daikto ypatybės
    </Text>
    <Paper shadow="md" radius="sm" p="md">
      <DetailRow label="Kategorija" value={category || 'Kita'} />
      {details?.map((detail, index) => (
        <DetailRow key={index} label={detail.name} value={detail.value} />
      ))}
    </Paper>
  </Box>
);

export default ItemDetails;
