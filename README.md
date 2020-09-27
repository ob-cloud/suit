# hardware-suit

hardware-suit javascript library

```js
const {LedLampEquip, Descriptor} = require('hardware-suit')

const bright = 88
const status = '6500000000000200'
const deviceType = '01'
const deviceChildType = '01'
const lampEquip = new LedLampEquip(status, deviceType, deviceChildType)

const lampDescriptor = Descriptor.getTypeDescriptor(deviceType, deviceChildType)

console.log('Turn Off Bytes: ', lampEquip.getTurnOffBytes())
console.log('Turn On Bytes: ', lampEquip.getTurnOnBytes(bright))
console.log('Lamp Type Descriptor: ', lampDescriptor)
```

```js
Turn Off Bytes:  0000000000000200
Turn On Bytes:  f200000000000200
Lamp Type Descriptor:  单色光
```
