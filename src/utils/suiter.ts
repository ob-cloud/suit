/**
 * 套件配置表模块
 *
 * 主类型、子类型均为16机制值
 * <pre>
 *  object<string, string> type:  设备类型匹配表.
 *    设备分为主设备类型及子设备类型，主类型的key为主类型码，
 *    子类型由主类型码及子类型码组成key <br/>
 *
 *  object<string, string> status: 设备状态匹配表，
 *    分类主类型设备状态，及子类型设备状态，其中主类型状态key由主类型码+状态码组成，
 *    子设备类型状态key由主类型码+子类型码+状态码组成 <br/>
 *
 *  object<string, array> group: 设备类型分组，同组类型状态截码位相同<br/>
 * </pre>
 */
export const Suiter = {
  led: {
    /**
     * led.type 类
     */
    type: {
      '01': '灯',
      '0101': '单色灯',
      '0102': '双色灯', // 冷暖色调光，双色灯
      '0103': '三色光',
      '0111': '1路滑条调光',
      '0112': '2路滑条调光',
      '0113': '3路滑条',
      '0114': '',
      '0115': '',
      '0116': '',
      '0119': '单 + 双',
      '0120': '',
      '0121': '',
      '0122': '',
      '0132': '',
      '0133': '风扇灯'
    },
    /**
     * led.status 状态
     */
    status: {
      '010100': '关',
      '0101ff': '开'
      // '0100': '关',
      // '0101': '开',
      // '0143': '微弱',
      // '0186': '弱光',
      // '01129': '亮',
      // '01172': '较亮',
      // '01215': '非常亮',
      // '01254': '最大亮度'
    },
    /**
     * led.group 状态分组
     */
    group: {
      root: ['01'],
      simple: ['01', '02'],
      color: ['03'],
      way: ['13'],

      // 双色灯
      bicolor: ['02', '03']
    }
  },
  /**
   * 电饭煲
   * @namespace Suiter.cooker
   */
  cooker: {
    // 电饭煲
    type: {
      '02': '智能电饭煲'
    }
  },
  /**
   * 加湿器
   * @namespace Suiter.humidifier
   */
  humidifier: {
    // 加湿器
    type: {
      '03': '智能加湿器'
    }
  },
  /**
   * 插座开关
   * @namespace Suiter.socketSwitch
   */
  socketSwitch: {
    // 插座开关
    type: {
      '04': '插座开关',
      '0401': '智能插座',
      '0402': '单线开关',
      '0403': '触摸开关',
      '0412': '智能插座',
      '0413': '智能插座',
      '0414': '智能插座',

      '0421': '1路开关',
      '0422': '2路开关',
      '0423': '3路开关',
      '0424': '4路开关',
      '0425': '触摸开关',
      '0426': '触摸开关',
      '0427': '触摸开关',
      '0428': '触摸开关',

      '0431': '1路情景开关',
      '0432': '2路情景开关',
      '0433': '3路情景开关',
      '0434': '4路情景开关',
      '0436': '6键情景开关',
      '04122': '可设置6键情景面板',

      '0441': '1路开关 + 3路情景开关',
      '0442': '2路开关 + 3路情景开关',
      '0443': '3路开关 + 3路情景开关',

      '0451': '一键单线开关',
      '0452': '二键单线开关',

      '0462': '2路开关+2路情景开关',

      '0480': '红外面板',
      '0481': '红外面板',
      '0483': '红外面板',
      '0486': '六键情景+红外对管',

      '0490': 'WiFi插座',
      '0491': '单一窗帘面板',
      '0492': '两个窗帘面板'
    },
    status: {
      '0400': '关',
      '0401': '开',
      '0410': '置反',
      '0411': '保持不变',
      // 0401 socket 4位bit，按含1开，不含1关处理
      '04s1': '开',
      '04s0': '关'
    },
    group: {
      // 类别分组， 状态取值区间相同，配置后会自动生成相应的判断方法
      root: ['04'],
      // 触摸开关，子类型组 byte[0]
      // touch: ['02', '21', '22', '23', '24', '25', '26', '28', '51', '52'],
      touch: ['02', '21', '22', '24', '25', '26', '28', '51', '52'],
      // 情景面板
      scene: ['31', '32', '33', '35'],
      // 可设置情景面板
      settableScene: ['122'],
      // 混合面板 byte[1]
      mix: ['41', '42', '43', '62', '83'],
      mixup: ['41', '42', '43', '62', '83'],
      // 普通开关
      normal: ['03'],
      // 插座 byte[0]
      simple: ['01', '12', '13', '14'],
      plug: ['01', '12', '13', '14'],

      // x 路开关
      xkey: ['21', '22', '23', '24', '31', '32', '33', '34', '36', '41', '42', '43', '62']
    },
    // 设备类型索引类型 一键开关 -> 1， 二建开关 -> 2 , 1路开关 + 3路情景面板 -> 1|3
    // 约定格式： 普通开关|情景|待约定
    typeIndex: {
      // 普通开关
      '0421': '1',
      '0422': '2',
      '0423': '3',
      '0424': '4',

      // 情景面板
      '0431': '|1',
      '0432': '|2',
      '0433': '|3',
      '0434': '|4',
      '0436': '|6',
      '04122': '|6',

      // 开关情景面板
      '0441': '1|3', // 开关|情景
      '0442': '2|3',
      '0443': '3|3',
      '0462': '2|2',

      '0451': '1',
      '0452': '2'
    },
    statusLength: {
      // 不同设备的状态码长度取值
      '01': 2,
      '12': 4,
      '13': 6,
      '14': 8,
      '21': 2,
      '22': 4,
      '23': 6,
      '24': 8,
      '41': 2,
      '42': 4,
      '43': 6,
      '51': 2,
      '52': 4,
      '62': 4,
      '71': 2,
      '81': 2,
      '83': 6
    }
  },
  /**
   * 开关类设备
   * @namespace Suiter.switchgear
   */
  switchgear: {
    // 开关类设备
    type: {
      '05': '智能开关类设备',
      '0501': '窗帘',
      '0502': '投影仪幕布'
    },
    status: {
      '0500': '关',
      '0501': '停',
      '0510': '开',
      '0502': '开'
    }
  },
  /**
   * 智能风扇
   * @namespace Suiter.fans
   */
  fans: {
    type: {
      '06': '智能风扇'
    }
  },
  /**
   * 智能空气净化器
   * @namespace Suiter.airCondition
   */
  airCondition: {
    type: {
      '07': '空调'
    }
  },
  tv: {
    type: {
      '08': '电视'
    }
  },
  usbRf: {
    type: {
      '09': '测试用USB_RF模块'
    }
  },
  gateway: {
    type: {
      '10': '网关',
      '1001': '通用版本',
      '1002': '阿里版本'
    }
  },
  sensors: {
    type: {
      '11': '传感器',
      '1101': '光明',
      '1102': '水浸',
      '1103': '雷达',
      '1104': 'CO',
      '1105': '环境（光湿温）',
      '1106': '人体感应（雷达+红外）',
      '1107': '空气质量（PM2.5+VOC）',
      '1108': '供电检测器',
      '1109': '虚拟雷达',
      '1110': '光线传感器',
      '1111': '温湿度传感器',
      '1112': '烟雾传感器',
      '1113': '超声波传感器',
      '1114': '雷达传感器',
      '1115': '插卡取电', // 插卡传感器
      '1116': '环境传感器',
      '1117': '感应面板',
      '1118': 'DC红外',
      '1119': 'AC红外',
      '1120': 'PM2.5',
      '1121': '门窗磁', // 门磁
      '1122': '雷达灯',
      '1123': 'DC人体+光感',
      '1124': 'AC人体+光感',
      '1125': '一键呼救传感器',
      '1126': '尿床传感器',
      '1127': '烟雾传感器',
      '1128': '燃气传感器',
      '1129': '插卡取电' // 插卡取电NFC
    },
    status: {
      // AC 红外
      '1100': '无人',
      '1101': '有人',
      // 插卡取电
      '11fe': '通电导通',
      '11fd': '断电',
      '11ff': '首次上电',
      '111500': '插卡',
      '111501': '拔卡',
      '111510': '断电',
      // 水浸
      '110200': '无异常',
      '110202': '无异常',
      '110201': '水浸警报',
      '112800': '无异常',
      '112802': '无异常',
      '112801': '燃气警报',
      '112700': '无异常',
      '112702': '无异常',
      '112701': '烟雾警报',
      '112600': '无异常',
      '112602': '无异常',
      '112601': '尿床警报',
      '112500': '无异常',
      '112502': '无异常',
      '112501': '呼救警报',
      '111900': '无人',
      '111901': '有人',
      '111902': '无人',
      '111903': '有人',
      '112400': '无人',
      '112401': '有人',
      '112300': '无人',
      '112301': '有人',
      '112302': '无人',
      '112303': '有人',
      '112100': '闭合',
      '112101': '打开',
      '112102': '闭合',
      '112103': '打开',
      // 插卡取电NFC
      '112900': '插卡',
      '112901': '拔卡',
      '112910': '断电',
    },
    group: {
      root: ['11'],
      als: ['01'],
      water: ['02'],
      radar: ['03'],
      co: ['04'],
      env: ['05'],
      body: ['06'],
      electric: ['08'],
      virtualRadar: ['09'],
      light: ['10'],
      humidifier: ['11'],
      smoke: ['12', '27'],
      wave: ['13'],
      radarSence: ['14'],
      cardSense: ['15'],
      pluginPower: ['15', '29'],
      envSense: ['16'],
      induction: ['17'],
      dc: '18',
      ac: ['19'],
      pm: ['20'],
      gate: ['21'],
      radarLight: ['22'],
      acdcman: ['23', '24'],
      gas: ['28'],
      // smoke: ['27'],
      Bedwetting: ['26'],
      help: ['25']
    }
  },
  meterReader: {
    type: {
      '12': '智能抄表器',
      '1201': '智能抄表器'
    }
  },
  wireControlPanel: {
    type: {
      '13': '线控面板',
      '1301': '空调线控器'
    },
    group: {
      root: ['11'],
      ac: ['01']
    },
    status: {
      '1300': '关',
      '1301': '开'
    }
  },
  transponder: {
    type: {
      '14': '红外转发器',
      '1401': '蓝牙',
      '1402': 'wifi',
      '1403': '红外线控面板'
    }
  },
  remoteControl: {
    type: {
      '15': '智能遥控设备',
      '1501': '手持单向遥控器'
    }
  },
  autoMover: {
    type: {
      '16': '智能自行设备',
      '1601': '飞机',
      '1602': '机械车'
    },
    group: {
      plane: ['01']
    }
  },
  camera: {
    type: {
      '17': '智能摄像类设备',
      '1701': '固定摄像设备（家用）',
      '1702': '防抖摄像设备（配合云台）'
    },
    group: {
      root: ['17'],
      fixed: ['01'],
      moving: ['02']
    }
  },
  finger: {
    type: {
      '16': '智能门禁，中控指纹机'
    }
  },
  doorLock: {
    type: {
      '21': '锁',
      '2101': '亚太天能智能门锁',
      '2102': '亿万家智能门锁',
      '2103': '家居门锁',
      '2104': '酒店门锁'
    },
    status: {
      '2100': '指纹开锁',
      '2101': '密码开锁',
      '2102': '卡开锁',
      '2103': '钥匙开锁',
      '2104': '遥控开锁',
      '2105': '临时用户开锁',
      '21-1': '关闭',
      '21open0': '指纹开锁',
      '21open1': '密码开锁',
      '21open2': '卡开锁',
      '21open3': '钥匙开锁',
      '21open4': '遥控开锁',
      '21open5': '临时用户开锁',
      '21close4': '反锁',
      '21close5': '门关闭',
      '21close7': '掩门',
      '21close8': '锁开',
      '21close9': '反锁开',
      '21card': '门卡开锁',
      default: '关门'
    },
    group: {
      root: ['21']
    }
  },
  remoteControlLamp: {
    type: {
      '22': '遥控灯',
      '2201': '遥控灯'
    }
  },
  smartCamera: {
    type: {
      '32': '摄像头'
    }
  },
  wifiSocket: {
    type: {
      '80': '单品wifi插座'
    }
  },
  wifiIr: {
    type: {
      '81': '红外转发器'
    }
  },
  infrared: {
    type: {
      '81': '红外转发器'
    }
  },
  obox: {
    type: {
      '10': 'obox',
      '1010': 'obox'
    },
    satus: {
      // device_type + status
      '100': '离线',
      '101': '在线'
    },
    group: {
      root: ['10']
    }
  }
};

/**
 * 套件类型
 */
export const SuitTypes = Array.from(Object.keys(Suiter)).reduce(
  // @ts-ignore
  (item, next, index) => {
    if (index === 1) {
      item = (Suiter as any)[item].type;
    }
    // @ts-ignore
    return { ...item, ...(Suiter as any)[next].type };
  }
);

/**
 * 套件状态，整合所有设备状态
 */
export const SuitStatus = Array.from(Object.keys(Suiter)).reduce(
  // @ts-ignore
  (item, next, index) => {
    if (index === 1) {
      item = (Suiter as any)[item].status;
    }
    // @ts-ignore
    return { ...item, ...(Suiter as any)[next].status };
  }
);

export default Suiter;
