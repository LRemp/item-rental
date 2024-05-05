import { Select } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '@/api';
import useApiResult from '@/hooks/useApiResult';
import { GenerateCategoriesTree } from '@/utils/Categories';

function CategorySelection() {
  const { category } = useParams();
  const navigate = useNavigate();
  const { result } = useApiResult(() => api.Category.getAll(), []);
  const [categories, setCategories] = useState<any>([]);

  useEffect(() => {
    if (result) {
      const data = GenerateCategoriesTree(result);
      setCategories(data);
    }
  }, [result]);

  return (
    <Select
      label="Kategorija"
      placeholder="Pasirinkite kategoriją"
      onChange={(value) => navigate(`/${value}`)}
      value={category}
      data={categories}
    />
  );
}

export default CategorySelection;
