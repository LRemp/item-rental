import { Anchor, Breadcrumbs } from '@mantine/core';
import React from 'react';

interface PagePathProps {
  links: PageLink[];
}

const PagePath: React.FC<PagePathProps> = ({ links }) => {
  const pathItems = links.map((item: PageLink, index: number) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  return <Breadcrumbs my="xs">{pathItems}</Breadcrumbs>;
};

export default PagePath;
