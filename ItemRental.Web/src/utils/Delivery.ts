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
    label: 'Atsiėmimas vietoje',
  },
  {
    value: '1',
    label: 'Siuntimas',
  },
];

export const deliveryStatusTips = [
  {
    id: 0,
    text: 'Jūsų rezervacija sėkmingai užregistruota, laukiame rezervacijos patvirtinimo',
  },
  {
    id: 1,
    text: 'Jūsų rezervacija patvirtinta, laukiame prekės išsiuntimo informacijos',
  },
  {
    id: 2,
    text: 'Jūsų užsakymas išsiųstas, laukiame pristatymo patvirtinimo',
  },
  {
    id: 3,
    text: 'Šiuo metu vyksta nuomos procesas, prašome nepamiršti grąžinti prekės laiku',
  },
  {
    id: 4,
    text: 'Nuomos daiktai grąžinami, laukiame prekės grąžinimo patvirtinimo',
  },
  {
    id: 5,
    text: 'Nuoimos daiktai sėkmingai grąžinti!',
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
  return '';
};
