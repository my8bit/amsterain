export const createDateFromTime = time => {
  const min = time.split(':')[1];
  const hour = time.split(':')[0];
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), hour, min);
};

export const parseTimeToNumber = time => {
  return parseInt(time.split(':')[0], 10);
};

export const getRainingTicks = data => {
  return data
    .filter((el, idx, arr) => {
      const prev = parseInt(arr[idx - 1] && arr[idx - 1].preceptoin, 10);
      const next = parseInt(arr[idx + 1] && arr[idx + 1].preceptoin, 10);
      return !((prev !== 0 && next !== 0) && (parseInt(el.preceptoin, 10) !== 0));
    })
    .filter(el => el.preceptoin !== '0')
    .map(el => createDateFromTime(el.time));
};

/*
Const ticks = data
  .filter((el, idx, arr) => {
    const prev = parseInt(arr[idx - 1] && arr[idx - 1].preceptoin, 10);
    const next = parseInt(arr[idx + 1] && arr[idx + 1].preceptoin, 10);
    return !((prev !== 0 && next !== 0) && (parseInt(el.preceptoin, 10) !== 0));
  })
  .filter(el => el.preceptoin !== '0')
  .map(el => createDateFromTime(el.time));
*/
