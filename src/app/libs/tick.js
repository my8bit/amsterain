// @flow

export const createDateFromTime = (time: string): Date => {
  const [min, hour] = time.split(':').map(num => parseInt(num, 10));
  const date = new Date();
  return new Date(
    date.getFullYear(), date.getMonth(), date.getDate(), hour, min
  );
};

/* TODO:
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

const ticks = data
  .filter((el, idx, arr) => {
    const prev = parseInt(arr[idx - 1] && arr[idx - 1].preceptoin, 10);
    const next = parseInt(arr[idx + 1] && arr[idx + 1].preceptoin, 10);
    return !((prev !== 0 && next !== 0) && (parseInt(el.preceptoin, 10) !== 0));
  })
  .filter(el => el.preceptoin !== '0')
  .map(el => createDateFromTime(el.time));
*/
