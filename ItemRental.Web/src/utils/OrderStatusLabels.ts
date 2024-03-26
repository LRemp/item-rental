type StatusLabel = {
  label: string;
  color: string;
};

const labels = {
  0: {
    label: 'Pending',
    color: 'blue',
  },
  1: {
    label: 'Accepted',
    color: 'green',
  },
  2: {
    label: 'Rejected',
    color: 'red',
  },
  3: {
    label: 'In progress',
    color: 'orange',
  },
  4: {
    label: 'Completed',
    color: 'green',
  },
  5: {
    label: 'Canceled',
    color: 'red',
  },
};

const indexedLabels: any = {
  Pending: {
    id: 0,
    color: 'blue',
    label: 'Pending',
  },
  Accepted: {
    id: 1,
    color: 'green',
    label: 'Accepted',
  },
  Rejected: {
    id: 2,
    color: 'red',
    label: 'Rejected',
  },
  'In progress': {
    id: 3,
    color: 'orange',
    label: 'In progress',
  },
  Completed: {
    id: 4,
    color: 'green',
    label: 'Completed',
  },
  Canceled: {
    id: 5,
    color: 'red',
    label: 'Canceled',
  },
};

export function GetBadgeData(label: string): any {
  return indexedLabels[label] || null;
}

export default labels;
