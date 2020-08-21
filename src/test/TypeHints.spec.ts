import test from 'ava';

import { TypeHints } from '../utils/typeHints';

const deviceType = '01';
const deviceChildType = '01';

test('TypeHints.isSimpleLed', t => {
  t.true(TypeHints.isSimpleLed(deviceChildType) === true);
});
