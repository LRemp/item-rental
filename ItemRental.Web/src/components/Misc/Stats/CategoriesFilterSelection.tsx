import { ActionIcon, Box, Center, Loader, Text, Title, UnstyledButton } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GenerateCategoriesTree } from '@/utils/Categories';
import useApiResult from '@/hooks/useApiResult';
import api from '@/api';

function CategoriesFilterSelection() {
  const { category } = useParams();
  const navigate = useNavigate();
  const { result, loading } = useApiResult(() => api.Category.getAll(), []);
  const [categories, setCategories] = useState<any>([]);

  useEffect(() => {
    if (result) {
      const data = GenerateCategoriesTree(result);
      setCategories(data);
    }
  }, [result]);

  return (
    <Box w="100%">
      <Text fw={600} size="md" mb="md">
        <Center inline>
          <Title order={3} fw={600}>
            Kategorijos {loading && <Loader size="xs" ml="xs" />}{' '}
          </Title>

          {category && (
            <ActionIcon onClick={() => navigate('/')} size="xs" ml="xs">
              <IconX size="xs" />
            </ActionIcon>
          )}
        </Center>
      </Text>
      {categories &&
        categories.map((item: any) => (
          <Box>
            <UnstyledButton
              key={item.id}
              c={item.value === category && category !== undefined ? 'blue' : ''}
              onClick={() => navigate(`/${item.value}`)}
              w="100%"
            >
              <Text size="sm" fw={500}>
                {item.label}
              </Text>
            </UnstyledButton>
            <Box ml="xs">
              {item.children.map((child: any) => (
                <UnstyledButton
                  key={child.id}
                  c={child.value === category && category !== undefined ? 'blue' : ''}
                  onClick={() => navigate(`/${child.value}`)}
                  w="100%"
                >
                  <Text size="sm" fw={500}>
                    {child.label}
                  </Text>
                </UnstyledButton>
              ))}
            </Box>
          </Box>
        ))}
    </Box>
  );
}

export default CategoriesFilterSelection;
