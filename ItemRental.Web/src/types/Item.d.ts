type Item = {
  id: string;
  name: string;
  description: string;
  category: string;
  images: string[];
  details: Detail[];
  tags: string[];
};

type Detail = {
  name: string;
  value: string;
};

type ItemCreateRequest = {
  name: string;
  description: string;
  images: File[];
};
