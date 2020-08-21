import test from 'ava';

import '../utils/string';

test('toCapital', t => {
  t.true('sensor'.toCapital() === 'Sensor');
});

test('toLower', t => {
  t.true('Sensor'.toLower() === 'sensor');
});

test('format', t => {
  t.true('{0} + {1} = {2}'.format('1', '1', '2') === '1 + 1 = 2');
  t.true('{0} + {1} = {2}'.format() === '{0} + {1} = {2}');
});
