type Item = {
  name: string;
  description: string;
  images: string[];
  tags: string[];
};

type ItemCreateRequest = {
  name: string;
  description: string;
  images: File[];
};
