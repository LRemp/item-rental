export const shippingProviders = [
  {
    value: '0',
    label: 'DPD',
  },
  {
    value: '1',
    label: 'LP EXPRESS',
  },
  {
    value: '2',
    label: 'Omniva',
  },
  {
    value: '3',
    label: 'Lietuvos paštas',
  },
];

export const deliveryTypes = [
  {
    value: '0',
    label: 'Pickup',
  },
  {
    value: '1',
    label: 'Shipping',
  },
];

export const deliveryStatusTips = [
  {
    id: 0,
    text: 'Your order is successfuly registered, now we are waiting for the merchant to accept it',
  },
];

export const getTrackingLink = (provider: string, id: string) => {
  switch (provider) {
    case '0':
      return `https://www.dpdgroup.com/lt/mydpd/my-parcels/track?lang=lt_en&parcelNumber=${id}`;
    case '1':
      return `https://www.lpexpress.lt/lt/sekimas?no=${id}`;
    case '2':
      return `https://manoold.omniva.lt/track/${id}//?language=lt`;
    case '3':
      return `https://www.post.lt/paieska/?search=${id}`;
  }
};
