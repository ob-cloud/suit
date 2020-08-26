import test from 'ava';

import { Descriptor } from '../utils/Descriptor';

const deviceType = '01';
const deviceChildType = '01';

test('Descriptor.getEquipTypeCode', t => {
  t.true(Descriptor.getEquipTypeCode(deviceType, deviceChildType) === '0101');
});

test('Descriptor.getEquipTypeDescriptor', t => {
  t.true(
    Descriptor.getEquipTypeDescriptor(deviceType, deviceChildType) === '单色灯'
  );
});

test('Descriptor.getLampDescriptor', t => {
  const status = '4300000000000200';
  t.true(
    Descriptor.getLedDescriptor(status, deviceType, deviceChildType) ===
      '亮度67'
  );
});
