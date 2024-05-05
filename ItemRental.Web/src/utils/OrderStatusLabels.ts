const labels = {
  0: {
    label: 'Laukiama patvirtinimo',
    name: 'pending',
    color: 'blue',
  },
  1: {
    label: 'Patvirtintas',
    name: 'accepted',
    color: 'green',
  },
  2: {
    label: 'Pristatomas',
    name: 'delivering',
    color: 'yellow',
  },
  3: {
    label: 'Nuomojamas',
    name: 'inprogress',
    color: 'orange',
  },
  4: {
    label: 'Grąžinamas',
    name: 'returning',
    color: 'yellow',
  },
  5: {
    label: 'Užbaigtas',
    name: 'completed',
    color: 'green',
  },
  6: {
    label: 'Atmestas',
    name: 'rejected',
    color: 'red',
  },
  7: {
    label: 'Atšauktas',
    name: 'cancelled',
    color: 'white',
  },
};

const indexedLabels: any = {
  pending: {
    id: 0,
    color: 'blue',
    label: 'Laukiama patvirtinimo',
  },
  accepted: {
    id: 1,
    color: 'green',
    label: 'Patvirtintas',
  },
  delivering: {
    id: 2,
    color: 'yellow',
    label: 'Pristatomas',
  },
  inprogress: {
    id: 3,
    color: 'orange',
    label: 'Nuomojamas',
  },
  returning: {
    id: 4,
    color: 'yellow',
    label: 'Grąžinamas',
  },
  completed: {
    id: 5,
    color: 'green',
    label: 'Užbaigtas',
  },
  rejected: {
    id: 6,
    color: 'red',
    label: 'Atmestas',
  },
  cancelled: {
    id: 7,
    color: 'gray',
    label: 'Atšauktas',
  },
};

export function GetBadgeData(label: string): any {
  return indexedLabels[label] || null;
}

export default labels;
