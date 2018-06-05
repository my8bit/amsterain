export const createDateFromTime = (time, tomorrow) => {
  const currentDate = new Date();
  const [hour, min] = time
    .split(':')
    .map(time => parseInt(time, 10));

  currentDate.setHours(hour);
  currentDate.setMinutes(min);
  currentDate.setSeconds(0);

  if (tomorrow) {
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return currentDate;
};

export const closetRaining = data => {
  let duration = 0;
  let startTime = false;
  for (let i = 0; i < data.length; i++) {
    if (parseInt(data[i].precipitation, 10) !== 0) {
      if (!startTime) {
        startTime = data[i].time;
      }
      duration += 5;
    } else if (startTime) {
      break;
    }
  }
  return {
    startTime,
    duration
  };
};

export const getRainingTicks = data => {
  let tomorrowFlag = false;
  return data
    .map((el, idx, arr) => {
      const previous = parseInt(arr[idx - 1] && arr[idx - 1].time, 10);
      const current = parseInt(el.time, 10);
      if (!(isNaN(current) || isNaN(previous))) {
        if (tomorrowFlag || previous - current === 23) {
          tomorrowFlag = true;
          return Object.assign({}, el, {midnight: true});
        }
      }
      return el;
    })
    .map(el => {
      const {time, precipitation, midnight = false} = el;
      const precep = Math.pow(10, ((parseInt(precipitation, 10) - 109) / 32));
      return {
        precep,
        time: createDateFromTime(time, midnight)
      };
    });
};
