import api from '@/api';
import useApiResult from '@/hooks/useApiResult';
import { Badge, Loader } from '@mantine/core';

interface ListingStatusProps {
  id: string;
}

const badgedata = {
  inrent: {
    color: 'orange',
    label: 'Aktyvi nuoma',
  },
  instock: {
    color: 'green',
    label: 'Inventoriuje',
  },
};

const ListingStatus: React.FC<ListingStatusProps> = ({ id }) => {
  const { result: item, loading } = useApiResult(
    () => api.RentListing.getMerchantListingById(id),
    []
  );

  const getStatus = (orders: Order[]) => {
    for (var order in orders) {
      if (orders[order].status > 0 && orders[order].status < 5) {
        return 'inrent';
      }
    }
    return 'instock';
  };

  const getStatusBadge = () => {
    const status = getStatus(item.orders);
    const label = badgedata[status].label;
    const color = badgedata[status].color;
    if (status == 'inrent') {
      return <Badge color={color}>{label}</Badge>;
    }
    return <></>;
  };

  return <>{loading ? <Loader /> : <>{getStatusBadge()}</>}</>;
};

export default ListingStatus;
