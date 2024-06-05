import { Image, Card, Text, Group, Button } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { useNavigate } from 'react-router-dom';
import classes from './ListingCard.module.css';
import NoImage from '@/assets/images/no_image.png';

const ListingCard: React.FC<RentListing> = ({ id, title, description, price, item }) => {
  const navigate = useNavigate();
  const slides = item.images?.map((image) => (
    <Carousel.Slide key={image}>
      <Image src={`/api/images/${image}`} height={220} fallbackSrc={NoImage} />
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
          {slides?.length > 0 ? (
            slides
          ) : (
            <Carousel.Slide>
              <Image src={NoImage} height={220} />
            </Carousel.Slide>
          )}
        </Carousel>
      </Card.Section>

      <Group justify="space-between" mt="lg">
        <Text fw={500} fz="md">
          {title}
        </Text>

        {/*<Group gap={5}>
          <IconStar style={{ width: rem(16), height: rem(16) }} />
          <Text fz="xs" fw={500}>
            4.78
          </Text>
        </Group>*/}
      </Group>

      <Text fz="xs" c="dimmed" mt="sm" lineClamp={4}>
        {description}
      </Text>

      <Group justify="space-between" mt="md">
        <div>
          <Text fz="xl" span fw={500} className={classes.price}>
            {price}€
          </Text>
          <Text span fz="sm" c="dimmed">
            {' '}
            / dienai
          </Text>
        </div>

        <Button radius="sm" variant="light" onClick={() => navigate(`/listing/${id}`)}>
          Išsinuomoti
        </Button>
      </Group>
    </Card>
  );
};

export default ListingCard;
