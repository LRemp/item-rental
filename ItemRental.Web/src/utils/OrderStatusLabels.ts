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
    label: 'Delivering',
    color: 'yellow',
  },
  3: {
    label: 'In Progress',
    color: 'orange',
  },
  4: {
    label: 'Returning',
    color: 'yellow',
  },
  5: {
    label: 'Completed',
    color: 'green',
  },
  6: {
    label: 'Rejected',
    color: 'red',
  },
  7: {
    label: 'Cancelled',
    color: 'white',
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
  Delivering: {
    id: 2,
    color: 'yellow',
    label: 'Delivering',
  },
  'In Progress': {
    id: 3,
    color: 'orange',
    label: 'In Progress',
  },
  Returning: {
    id: 4,
    color: 'yellow',
    label: 'Returning',
  },
  Completed: {
    id: 5,
    color: 'green',
    label: 'Completed',
  },
  Rejected: {
    id: 6,
    color: 'red',
    label: 'Rejected',
  },
  Cancelled: {
    id: 7,
    color: 'gray',
    label: 'Cancelled',
  },
};

export function GetBadgeData(label: string): any {
  return indexedLabels[label] || null;
}

export default labels;
