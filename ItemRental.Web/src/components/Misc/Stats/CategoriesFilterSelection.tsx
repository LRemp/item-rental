import api from '@/api';
import useApiResult from '@/hooks/useApiResult';
import { GenerateCategoriesTree } from '@/utils/Categories';
import {
  ActionIcon,
  Box,
  Center,
  Group,
  Loader,
  Skeleton,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function CategoriesFilterSelection() {
  const { category } = useParams();
  const navigate = useNavigate();
  const { result, loading } = useApiResult(() => api.Category.getAll(), []);
  const [categories, setCategories] = useState<any>(null);

  useEffect(() => {
    if (result) {
      console.log(result);
      const data = GenerateCategoriesTree(result);
      console.log(data);
      setCategories(data);
    }
  }, [result]);

  const select = (name: string) => {};

  console.log(category);

  return (
    <Box w={'100%'}>
      <Text fw={600} size="md" mb="md">
        <Center inline>
          Categories {loading && <Loader size={'xs'} ml={'xs'} />}{' '}
          {category && (
            <ActionIcon onClick={() => navigate('/')} size="xs" ml={'xs'}>
              <IconX size="xs"></IconX>
            </ActionIcon>
          )}
        </Center>
      </Text>
      {categories &&
        categories.map((item: any) => (
          <Group>
            <UnstyledButton
              key={item.id}
              c={item.name == category ? 'blue' : ''}
              onClick={() => navigate(`/${item.value}`)}
            >
              <Text size="sm" fw={500}>
                {item.label}
              </Text>
            </UnstyledButton>
          </Group>
        ))}
    </Box>
  );
}

export default CategoriesFilterSelection;
