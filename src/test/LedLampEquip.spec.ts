import test from 'ava';

import { LedLampEquip } from '../modules/LedLampEquip';

const status = '4300000000000200';
const ledEquip = new LedLampEquip(status);

test('ledEquip.isBicolor', t => {
  t.true(ledEquip.isBicolor() === false);
});

test('ledEquip.isPlainColor', t => {
  t.true(ledEquip.isPlainColor() === true);
});
