# OBOX设备管理

1. 涉及接口
<html>
    <!--在这里插入内容-->

    export function getDeviceList() {//查看设备列表
     return get(`consumer/common?CMD=query_device`);
    }
    export function settingNodeStatus(serialId, status) {//设置设备状态
     return post(`consumer/common?CMD=setting_node_status&serialId=${serialId}&status=${status}`);
    }
    export function addUserNoAuth(serialId, startTime, endTime, mobile) {//发送门锁临时密码
     return post(`consumer/common?CMD=add_intelligent_remote_user_no_auth&serialId=${serialId}&nickName=OBHotel&startTime=${startTime}&endTime=${endTime}&mobile=${mobile}&isMax=1`);
    }
    export function queryNodeRealStatus(serialId) {//查看设备真实状态
     return post(`consumer/common?CMD=query_node_real_status&serialId=${serialId}`);
    }
    export function settingRemoteLed(obox_serial_id, serialId, status) { //设置遥控灯
     return post(`consumer/common?CMD=setting_remote_led&type=3&obox_serial_id=${obox_serial_id}&serialId=${serialId}&status=${status}`);
    }
    export function queryAliDev() {//查看红外列表
     return post(`consumer/common?CMD=query_ali_dev`);
    }
    export function queryIrDevice(serialId) {//查询红外列表下面设备
     return post(`consumer/common?CMD=query_ir_device&serialId=${serialId}`);
    }
    export function controlIrDevice(serialId, index, key, keyType) {//控制红外设备
     return post(`consumer/common?CMD=control_ir_device&serialId=${serialId}&index=${index}&keyType=${keyType}&key=${key}`);
    }
</html>

2. status说明(16进制)
- 插座：0306030000000f00
  - 读取status前2个字节： 03转为16进制 00000011
  - 右边开始，每一个字节表示一个插座的状态1表示开0表示关，最多8个
- 开关：0100000000000000
  - 读取status前2个字节： 01转为16进制 00000001
  - 右边开始，每2个字节表示一个开关的状态00表示关01表示开10置反11保持不变，最多4个
- 情景：04000000000000
  - 读取status前2个字节： 04转为16进制 00000100
  - 右边开始，每一个字节表示一个情景状态，触发的时候只要传要触发的情景的status即可，第二个情景02000000000000
  - 特殊：情景只有在触发的时候传递，web端不保存当前状态
- 开关情景：02150000000000
  - 读取status前2个字节表示情景： 02转为16进制 00000010
  - 读取status的3-4个字节表示开关： 15转为16进制 00010101
- 单/双色光：c711ff0000000000
  - 读取status前2个字节表示亮度：取值范围154-255，计算方式154+冷色百分，设置的时候要转为16进制
  - 读取status的3-4个字节冷色比例： 255（ff）表示最亮，计算方式255-2.55*Num，设置的时候转16
  - 读取status的5-6字节表示暖色，固定传ff
- 窗帘：01000000000000
  - 读取status前2个字节： 00全关01暂停02全开
- 遥控灯：03fd03005b000002
  - 读取status的3-4字节： 01开灯02关灯fd调灯双色fe调色RGB
  - 读取status的5-8字节： 控制的灯，一个字节表示一个灯，前两个字节表示低位0-8，后两个字节表示高位9-16
  - 读取status的9-16字节：表示亮度/红，色温/绿，色温/蓝，时长
- 传感器：
  - 燃气传感：3-4字节，00表示无01表示燃气警报
  - 烟雾传感：3-4字节，00表示无01表示烟雾警报
  - 尿床传感：3-4字节，00表示无01表示尿床警报
  - 一键呼救：3-4字节，00表示无01表示呼救
  - 门磁传感：3-4字节，00表示闭合01表示打开
  - 水浸传感：3-4字节，00表示无01表示水浸警报
  - AC人体红外：5-6字节，00表示无人01表示有人
  - AC+光感：3-4字节，00表示无人01表示有人，7-8字节亮度05表示100%，03表示50%
- 红外空调，电视，线控空调：
  - 发送码库的固定指令到后台控制设备
