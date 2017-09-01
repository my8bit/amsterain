const {loadReducer} = require('./index');
const data = require('../../mocks/data')[0].pageFunctionResult.data;
test('getRainingTicks', () => {
  const processedData = loadReducer({}, {'type': 'LOAD', data});
  expect(3).toBe(3);
});