import { Image, Card, Text, Group, Button, rem } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { IconStar } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import classes from './ListingCard.module.css';

const ListingCard: React.FC<RentListing> = ({ id, title, description, price, item }) => {
  const navigate = useNavigate();
  const slides = item.images.map((image) => (
    <Carousel.Slide key={image}>
      <Image src={`/images/${image}`} height={220} />
    </Carousel.Slide>
  ));

  return (
    <Card radius="sm" withBorder padding="md">
      <Card.Section>
        <Carousel
          withIndicators
          loop
          classNames={{
            root: classes.carousel,
            controls: classes.carouselControls,
            indicator: classes.carouselIndicator,
          }}
        >
          {slides}
        </Carousel>
      </Card.Section>

      <Group justify="space-between" mt="lg">
        <Text fw={500} fz="md">
          {title}
        </Text>

        <Group gap={5}>
          <IconStar style={{ width: rem(16), height: rem(16) }} />
          <Text fz="xs" fw={500}>
            4.78
          </Text>
        </Group>
      </Group>

      <Text fz="xs" c="dimmed" mt="sm" lineClamp={4}>
        {description}
      </Text>

      <Group justify="space-between" mt="md">
        <div>
          <Text fz="xl" span fw={500} className={classes.price}>
            {price}$
          </Text>
          <Text span fz="sm" c="dimmed">
            {' '}
            / day
          </Text>
        </div>

        <Button radius="sm" variant="light" onClick={() => navigate(`/listing/${id}`)}>
          Rent now
        </Button>
      </Group>
    </Card>
  );
};

export default ListingCard;
