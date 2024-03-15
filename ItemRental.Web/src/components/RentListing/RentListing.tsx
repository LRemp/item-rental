import { Badge, Button, Card, Group, Image, Text } from '@mantine/core';
import classes from './RentListing.module.css';
import React from 'react';
import { useHover } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';

function RentListing({ id, title, description, item, renter, price, location }: RentListing) {
  const { hovered, ref } = useHover();
  const navigate = useNavigate();
  return (
    <Card
      withBorder
      radius="md"
      className={classes.card}
      shadow="md"
      style={{ background: hovered ? '#e6e6e6' : '', transition: 'background 200ms ease' }}
      ref={ref}
      onClick={() => navigate(`/listing/${id}`)}
    >
      <Card.Section className={classes.imageSection}>
        <Image src="https://i.imgur.com/ZL52Q2D.png" alt="Tesla Model S" />
      </Card.Section>

      <Group justify="space-between" my="md">
        <div>
          <Text fw={500}>{title}</Text>
          <Text fz="xs" c="dimmed">
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

          <Button radius="xl" style={{ flex: 1 }}>
            Rent now
          </Button>
        </Group>
      </Card.Section>
    </Card>
  );
}

export default RentListing;
