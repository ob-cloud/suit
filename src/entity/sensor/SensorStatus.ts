import { Status } from '../Status';
export class SensorStatus extends Status {
  // 常规状态
  public normalStatus: string = '';
  // 常规传感器状态
  public readonly temperatureStatus: string = '';
  public readonly humidityStatus: string = '';
  public readonly pluginPowerStatus: string = '';

  constructor(status: string) {
    super(status);
    this.normalStatus = status.slice(8, 10);
    this.pluginPowerStatus = status.slice(0, 2);
    this.temperatureStatus = status.slice(2, 4);
    this.humidityStatus = status.slice(6, 8);
  }

  public setSensorNormalStatus(normal: string): SensorStatus {
    this.normalStatus = this.adaptHex(normal);
    return this;
  }
  public getSensorNormalStatus(): string {
    return this.normalStatus;
  }
  public getSensorCardStatus() {
    return this.pluginPowerStatus;
  }
  public getSensorTemperatureStatus() {
    return this.temperatureStatus;
  }
  public getSensorHumidityStatus() {
    return this.humidityStatus;
  }
}
