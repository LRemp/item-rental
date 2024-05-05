import { Loader } from '@mantine/core';
import React from 'react';
import api from '@/api';
import useApiResult from '@/hooks/useApiResult';
import MerchantListingsTable from '../Tables/MerchantListingsTable';

interface MerchantListingsTabProps {
  id: string;
}

const MerchantListingsTab: React.FC<MerchantListingsTabProps> = ({ id }) => {
  const { result, loading } = useApiResult(() => api.User.getMerchantListings(id), []);
  return <>{loading ? <Loader /> : <MerchantListingsTable elements={result} />}</>;
};

export default MerchantListingsTab;
