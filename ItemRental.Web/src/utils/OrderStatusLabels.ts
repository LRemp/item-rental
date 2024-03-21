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

export default labels;
