const dataShort = require('../../mocks/data.short')[0].pageFunctionResult.data;
const data = require('../../mocks/data')[0].pageFunctionResult.data;
const isRaining = require('../../mocks/isRaining');
import {getRainingTicks, closetRaining} from './tick';

const getDatesStrings = () => {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const todayDateString = today.toDateString();
  const tomorrowDateString = tomorrow.toDateString();
  return {
    todayDateString,
    tomorrowDateString
  };
};

describe('getRainingTicks', () => {
  test('getRainingTicks for short data', () => {
    const {todayDateString, tomorrowDateString} = getDatesStrings();
    expect(
      getRainingTicks(dataShort)
        .map(data => data.time.toString().substring(0, 24))
    ).toEqual([
      `${todayDateString} 23:15:00`,
      `${todayDateString} 23:30:00`,
      `${todayDateString} 23:45:00`,
      `${tomorrowDateString} 00:00:00`,
      `${tomorrowDateString} 00:15:00`,
      `${tomorrowDateString} 00:30:00`,
      `${tomorrowDateString} 00:45:00`,
      `${tomorrowDateString} 01:00:00`,
      `${tomorrowDateString} 01:15:00`,
      `${tomorrowDateString} 01:30:00`,
      `${tomorrowDateString} 01:45:00`
    ]);
  });

  test('getRainingTicks for data', () => {
    const {todayDateString, tomorrowDateString} = getDatesStrings();
    expect(
      getRainingTicks(data)
        .map(data => data.time.toString().substring(0, 24))
    ).toEqual([
      `${todayDateString} 23:05:00`,
      `${todayDateString} 23:10:00`,
      `${todayDateString} 23:15:00`,
      `${todayDateString} 23:20:00`,
      `${todayDateString} 23:25:00`,
      `${todayDateString} 23:30:00`,
      `${todayDateString} 23:35:00`,
      `${todayDateString} 23:40:00`,
      `${todayDateString} 23:45:00`,
      `${todayDateString} 23:50:00`,
      `${todayDateString} 23:55:00`,
      `${tomorrowDateString} 00:00:00`,
      `${tomorrowDateString} 00:05:00`,
      `${tomorrowDateString} 00:10:00`,
      `${tomorrowDateString} 00:15:00`,
      `${tomorrowDateString} 00:20:00`,
      `${tomorrowDateString} 00:25:00`,
      `${tomorrowDateString} 00:30:00`,
      `${tomorrowDateString} 00:35:00`,
      `${tomorrowDateString} 00:40:00`,
      `${tomorrowDateString} 00:45:00`,
      `${tomorrowDateString} 00:50:00`,
      `${tomorrowDateString} 00:55:00`,
      `${tomorrowDateString} 01:00:00`,
      `${tomorrowDateString} 01:05:00`,
      `${tomorrowDateString} 01:10:00`,
      `${tomorrowDateString} 01:15:00`,
      `${tomorrowDateString} 01:20:00`,
      `${tomorrowDateString} 01:25:00`
    ]);
  });
});

describe('closetRaining', () => {
  test('closetRaining for short data', () => {
    expect(closetRaining(dataShort)).toEqual({startTime: '23:45', duration: 10});
  });

  test('closetRaining for data', () => {
    expect(closetRaining(data)).toEqual({startTime: '23:15', duration: 10});
  });

  test('isRaining', () => {
    const expectedResults = [
      {startTime: '23:55', duration: 15},
      {startTime: '23:50', duration: 15},
      {startTime: '23:45', duration: 15},
      {startTime: '23:45', duration: 10}
    ];
    isRaining.forEach((mock, idx) => {
      expect(closetRaining(mock.data)).toEqual(expectedResults[idx]);
    });
  });
});
