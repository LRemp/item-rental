import { Badge, Box, Button, Card, Group, Highlight, Image, Text } from '@mantine/core';
import classes from './ListingCard.module.css';
import React from 'react';
import { useHover } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
import NoImage from '@/assets/images/no_image.png';

interface ListingCardProps extends RentListing {
  highlight?: string;
}

const ListingCard: React.FC<ListingCardProps> = ({
  id,
  title,
  description,
  item,
  renter,
  price,
  location,
  highlight,
}) => {
  const navigate = useNavigate();

  return (
    <Card withBorder radius="sm" className={classes.card} shadow="md">
      <Card.Section className={classes.imageSection}>
        <Image
          src={`/images/${item.images?.[0]}`}
          h={140}
          alt="Tesla Model S"
          fallbackSrc={NoImage}
        />
      </Card.Section>

      <Group justify="space-between" my="md" h={'60'}>
        <div>
          <Highlight fw={500} highlight={highlight || ''}>
            {title}
          </Highlight>
          <Highlight fz="xs" c="dimmed" lineClamp={2} highlight={highlight || ''}>
            {description}
          </Highlight>
        </div>
      </Group>

      <Card.Section className={classes.section}>
        <Group gap={30}>
          <div>
            <Text fz="xl" fw={700} style={{ lineHeight: 1 }}>
              {price} Eur
            </Text>
            <Text fz="sm" c="dimmed" fw={500} style={{ lineHeight: 1 }} mt={3}>
              per day
            </Text>
          </div>

          <Button
            radius="sm"
            variant="light"
            style={{ flex: 1 }}
            onClick={() => navigate(`/listing/${id}`)}
          >
            Rent now
          </Button>
        </Group>
      </Card.Section>
    </Card>
  );
};

export default ListingCard;
