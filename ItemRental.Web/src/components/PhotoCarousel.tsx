import { Carousel } from '@mantine/carousel';
import { Image } from '@mantine/core';

export default function PhotoCarousel() {
  return (
    <Carousel mx="auto" withIndicators loop>
      <Carousel.Slide>
        <Image
          src="https://www.dpreview.com/files/p/articles/2383622612/P1020405-processed.jpeg"
          alt="Tesla Model S"
        />
      </Carousel.Slide>
      <Carousel.Slide>
        <Image
          src="https://www.dpreview.com/files/p/articles/2383622612/P1020405-processed.jpeg"
          alt="Tesla Model S"
        />
      </Carousel.Slide>
      <Carousel.Slide>
        <Image
          src="https://www.dpreview.com/files/p/articles/2383622612/P1020405-processed.jpeg"
          alt="Tesla Model S"
        />
      </Carousel.Slide>
    </Carousel>
  );
}
