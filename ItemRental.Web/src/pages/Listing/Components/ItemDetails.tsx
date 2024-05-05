import { Box, Group, Paper, Text, Title } from '@mantine/core';

const ItemDetails: React.FC<Item> = ({ details, category }) => {
  console.log(details);
  return (
    <Box>
      <Title fw={600} order={4} mt="lg">
        Daikto ypatybės
      </Title>
      <Paper shadow="md" radius="sm" p="md">
        <DetailRow label="Kategorija" value={category || 'Kita'} />
        {details?.map((detail, index) => (
          <DetailRow key={index} label={detail.name} value={detail.value} />
        ))}
      </Paper>
    </Box>
  );
};

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

export default ItemDetails;
