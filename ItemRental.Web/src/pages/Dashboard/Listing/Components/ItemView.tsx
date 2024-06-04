import PhotoCarousel from '@/components/Misc/PhotoCarousel';
import ItemDetails from './ItemDetails';
import { Paper, Grid, Group, Title, Badge, Text, Image, Box } from '@mantine/core';
import ItemActions from '../../Inventory/Components/ItemActions';
import NoImage from '@/assets/images/no_image.png';
import Orders from './Orders';

const ItemView: React.FC<RentListing> = ({ id, title, description, item, orders }) => (
  <Grid>
    <Grid.Col span={{ base: 12, sm: 4 }}>
      <Paper shadow="md" radius="sm" p="md">
        {item.images == null ? (
          <Image src={NoImage} radius="xs" w="full" fit="contain" />
        ) : (
          <PhotoCarousel images={item.images} />
        )}

        <Group mt="sm">
          <Title fw={600} order={3}>
            {title}
          </Title>
          <Text size="xs" opacity="50%">
            ({item.category})
          </Text>
        </Group>
        {item.tags && (
          <Text>
            {item.tags.map((x: string, index: number) => (
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
        <ItemActions id={id} />
        <ItemDetails details={item.details} />
      </Paper>
    </Grid.Col>
  </Grid>
);

export default ItemView;
