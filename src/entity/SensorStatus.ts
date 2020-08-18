import { Status } from './Status';
export class SensorStatus extends Status {
  public readonly rootStatus: string = '';
  public readonly cardStatus: string = '';
  public readonly temperatureStatus: string = '';
  public readonly humidityStatus: string = '';

  constructor(status: string) {
    super(status);
    this.rootStatus = status.slice(8, 10);
    this.cardStatus = status.slice(0, 2);
    this.temperatureStatus = status.slice(2, 4);
    this.humidityStatus = status.slice(6, 8);
  }

  public getSensorRootStatus() {
    return this.rootStatus;
  }
  public getSensorCardStatus() {
    return this.cardStatus;
  }
  public getSensorTemperatureStatus() {
    return this.temperatureStatus;
  }
  public getSensorHumidityStatus() {
    return this.humidityStatus;
  }
}
