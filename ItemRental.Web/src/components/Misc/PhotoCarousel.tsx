import { Carousel } from '@mantine/carousel';
import { Flex, Image } from '@mantine/core';

export default function PhotoCarousel({ images }: { images: string[] }) {
  return (
    <Carousel mx="auto" withIndicators loop maw="600px">
      {images &&
        images.map((image) => (
          <Carousel.Slide>
            <Flex justify="center" align="center" h="100%" w="100%">
              <Image src={`/images/${image}`} alt="Tesla Model S" />
            </Flex>
          </Carousel.Slide>
        ))}
    </Carousel>
  );
}
