import { Badge, Box, Button, Card, Group, Image, Text } from '@mantine/core';
import classes from './RentListing.module.css';
import React from 'react';
import { useHover } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
import NoImage from '@/assets/images/no_image.png';

function RentListing({ id, title, description, item, renter, price, location }: RentListing) {
  const navigate = useNavigate();

  console.log(item);

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

      <Group justify="space-between" my="md">
        <div>
          <Text fw={500}>{title}</Text>
          <Text fz="xs" c="dimmed" lineClamp={2}>
            {description}
          </Text>
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
}

export default RentListing;
