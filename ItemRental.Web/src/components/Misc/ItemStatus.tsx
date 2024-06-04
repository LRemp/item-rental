import api from '@/api';
import useApiResult from '@/hooks/useApiResult';
import { Badge, Loader } from '@mantine/core';

interface ItemStatusProps {
  id: string;
}

const badgedata = {
  inrent: {
    color: 'orange',
    label: 'Nuomojamas',
  },
  instock: {
    color: 'green',
    label: 'Inventoriuje',
  },
};

const ItemStatus: React.FC<ItemStatusProps> = ({ id }) => {
  const { result: item, loading } = useApiResult(() => api.Item.get(id), []);

  const getStatus = (orders: Order[]) => {
    for (var order in orders) {
      if (orders[order].status > 1 && orders[order].status < 5) {
        return 'inrent';
      }
    }
    return 'instock';
  };

  const getStatusBadge = () => {
    const status = getStatus(item.orders);
    const label = badgedata[status].label;
    const color = badgedata[status].color;
    return <Badge color={color}>{label}</Badge>;
  };

  return <>{loading ? <Loader /> : <>{getStatusBadge()}</>}</>;
};

export default ItemStatus;
