import PhotoCarousel from '@/components/Misc/PhotoCarousel';
import ItemDetails from './ItemDetails';
import { Paper, Grid, Group, Title, Badge, Text, Image, Box } from '@mantine/core';
import ItemActions from '../../Inventory/Components/ItemActions';
import NoImage from '@/assets/images/no_image.png';
import Orders from './Orders';

const ItemView: React.FC<Item> = ({
  id,
  name,
  description,
  images,
  category,
  details,
  tags,
  orders,
}) => (
  <Grid>
    <Grid.Col span={{ base: 12, sm: 4 }}>
      <Paper shadow="md" radius="sm" p="md">
        {images == null ? (
          <Image src={NoImage} radius="xs" w="full" fit="contain" />
        ) : (
          <PhotoCarousel images={images} />
        )}

        <Group mt="sm">
          <Title fw={600} order={3}>
            {name}
          </Title>
          <Text size="xs" opacity="50%">
            ({category})
          </Text>
        </Group>
        {tags && (
          <Text>
            {tags.map((x: string, index: number) => (
              <Badge variant="default" radius="xl" size="xs" mr="2px" key={index}>
                <Text fw={400} size="xs">
                  {x.toUpperCase()}
                </Text>
              </Badge>
            ))}
          </Text>
        )}
        <Text>{description}</Text>
      </Paper>
    </Grid.Col>
    <Grid.Col span={{ base: 12, sm: 6 }}>
      <Paper shadow="md" radius="sm" p="md">
        <Orders orders={orders} />
      </Paper>
    </Grid.Col>
    <Grid.Col span={{ base: 12, sm: 3 }}>
      <Paper shadow="md" radius="sm" p="md">
        <ItemDetails details={details} />
      </Paper>
    </Grid.Col>
  </Grid>
);

export default ItemView;
