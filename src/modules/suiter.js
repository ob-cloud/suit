/*
 * @Author: eamiear
 * @Date: 2019-08-12 11:21:50
 * @Last Modified by: eamiear
 * @Last Modified time: 2019-08-23 10:30:20
 */

/**
 * @description 套件配置表模块<br>
 * <pre>
 *  type: 设备类型匹配表，由主类型、子类型编码值组成key <br/>
 *  status: 设备状态匹配表， 由主类型码+状态码组成key<br/>
 *  group: 设备类型分组，同组类型状态截码位相同<br/>
 * </pre>
 * @namespace
 * @name Suiter
 */
export const Suiter = {
  /**
   * 灯
   * @namespace Suiter.led
   */
  led: {
    /** led.type 类型*/
    type: {
      '01': '灯',
      '0101': '单色光',
      '0102': '落地灯', // 冷暖色调光，双色灯
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
    /** led.status 状态*/
    status: {
      // '0100': '关',
      // '0101': '开',
      // '0143': '微弱',
      // '0186': '弱光',
      // '01129': '亮',
      // '01172': '较亮',
      // '01215': '非常亮',
      // '01254': '最大亮度'
    },
    /** led.group 状态分组*/
    group: {
      root: ['01'],
      simple: ['01', '02'],
      color: ['03'],
      way: ['13']
    }
  },
  /**
   * 电饭煲
   * @namespace Suiter.cooker
  */
  cooker: { // 电饭煲
    type: {
      '02': '智能电饭煲'
    }
  },
  /**
   * 加湿器
   * @namespace Suiter.humidifier
  */
  humidifier: { // 加湿器
    type: {
      '03': '智能加湿器'
    }
  },
  /**
   * 插座开关
   * @namespace Suiter.socketSwitch
  */
  socketSwitch: { // 插座开关
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
      '0425': '普通触摸开关',
      '0426': '普通触摸开关',
      '0427': '普通触摸开关',
      '0428': '普通触摸开关',

      '0431': '一路情景面板',
      '0432': '两路情景面板',
      '0433': '3路情景面板',
      '0434': '4路情景面板',
      '0436': '六键情景',

      '0441': '1路开关 + 3路情景面板',
      '0442': '2路开关 + 3路情景面板',
      '0443': '3路开关 + 3路情景面板',

      '0451': '一键单线开关',
      '0452': '二键单线开关',

      '0462': '2开关+2情景面板',

      '0480': '红外面板',
      '0481': '红外面板',
      '0483': '红外面板',
      '0486': '六键情景+红外对管',

      '0490': 'WiFi插座',
      '0491': '单一窗帘面板',
      '0492': '两个窗帘面板',
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
    group: { // 类别分组， 状态取值区间相同，配置后会自动生成相应的判断方法
      root: ['04'],
      // 触摸开关，子类型组 byte[0]
      touch: ['02', '21', '22', '23', '24', '25', '26', '28', '51', '52'],
      // 情景面板
      scene: ['31', '32', '33', '35'],
      // 混合面板 byte[1]
      mix: ['41', '42', '43', '62', '83'],
      // 普通开关
      normal: ['03', '12', '13', '14'],
      // 插座 byte[0]
      simple: ['01']
    }
  },
  /**
   * 开关类设备
   * @namespace Suiter.switchgear
  */
  switchgear: { // 开关类设备
    type: {
      '05': "",
      "0501": "窗帘",
      "0502": "投影仪幕布"
    },
    status: {
      '0500': '关',
      '0501': '停',
      '0510': '开',
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
   * @namespace Suiter.airCleaner
  */
  airCleaner: {
    type: {
      '07': '智能空气净化器'
    }
  },
  tv: {
    type: {
      '08': '兼容型智能电视'
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
      "11": "传感器",
      "1101": "光明",
      "1102": "水浸",
      "1103": "雷达",
      "1104": "CO",
      "1105": "环境（光湿温）",
      "1106": "人体感应（雷达+红外）",
      "1107": "空气质量（PM2.5+VOC）",
      "1108": "供电检测器",
      "1109": "虚拟雷达",
      "1110": "光线传感器",
      "1111": "温湿度传感器",
      "1112": "烟雾传感器",
      "1113": "超声波传感器",
      "1114": "雷达传感器",
      "1115": "插卡取电", // 插卡传感器
      "1116": "环境传感器",
      "1117": "感应面板",
      "1118": "DC红外",
      "1119": "AC红外",
      "1120": "PM2.5",
      "1121": "门窗磁",// 门磁
      "1122": "雷达灯",
      "1123": "DC人体+光感",
      "1124": "AC人体+光感"
    },
    status: {
      // AC 红外
      '1100': '无人',
      '1101': '有人',
      // 插卡取电
      '11fe': '通电导通',
      '11fd': '断电',
      '11ff': '首次上电'
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
      smoke: ['12'],
      wave: ['13'],
      radarSence: ['14'],
      cardSense: ['15'],
      envSense: ['16'],
      induction: ['17'],
      dc: '18',
      ac: '19',
      pm: ['20'],
      gate: ['21'],
      radarLight: ['22']
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
      '16': '智能门禁，中控指纹机',
    }
  },
  doorLock: {
    type: {
      "21": "锁",
      "2101": "亚太天能智能门锁",
      "2102": "亿万家智能门锁",
      "2103": "家居门锁",
      "2104": "酒店门锁"
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
      'default': '关闭'
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
      '32': '摄像头',
    }
  },
  wifiSocket: {
    type: {
      '80': '单品wifi插座',
    }
  },
  wifiIr: {
    type: {
      '81': '单品wifi红外转发器，不存储版本',
    }
  },
  obox: {
    type: {
      '10': 'obox',
      '1010': 'obox'
    },
    satus: { // device_type + status
      '100': '离线',
      '101': '在线'
    },
    group: {
      root: ['10']
    }
  }
}

/**
 * 套件类型
 * @const
 * @memberof Suiter
 * @name SuitTypes
 */
export const SuitTypes = (Array.from(Object.keys(Suiter)).reduce((item, next, index)=> {
  if (index === 1) {
    item = Suiter[item].type
  }
  return {...item, ...(Suiter[next].type)}
}))

/**
 * 套件状态
 * @const
 * @memberof Suiter
 * @name SuitStatus
 */
export const SuitStatus = (Array.from(Object.keys(Suiter)).reduce((item, next, index)=> {
  if (index === 1) {
    item = Suiter[item].status
  }
  return {...item, ...(Suiter[next].status)}
}))

export default Suiter
