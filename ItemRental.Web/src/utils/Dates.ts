const getDateLabel = (dateValue: string) => {
  const date = new Date(dateValue);
  return date.toLocaleDateString('en-US');
};

export default getDateLabel;
