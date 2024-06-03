const getDateLabel = (dateValue: string) => {
  const date = new Date(dateValue);
  // Pad a number with leading zeros if necessary
  function pad(n: number) {
    return n < 10 ? '0' + n : n;
  }

  let year = date.getFullYear();
  let month = pad(date.getMonth() + 1); // getMonth() returns 0-11, so add 1
  let day = pad(date.getDate());

  return `${year}/${month}/${day}`;
};

const getDateTimeLabel = (dateValue: string) => {
  // Pad a number with leading zeros if necessary
  if (dateValue == '' || dateValue == undefined) {
    return '';
  }

  const date = new Date(dateValue);

  function pad(n: number) {
    return n < 10 ? '0' + n : n;
  }

  let year = date.getFullYear();
  let month = pad(date.getMonth() + 1); // getMonth() returns 0-11, so add 1
  let day = pad(date.getDate());
  let hours = pad(date.getHours());
  let minutes = pad(date.getMinutes());
  let seconds = pad(date.getSeconds());

  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
};

export { getDateLabel, getDateTimeLabel };
