import { LampEquip } from './LampEquip';

class LedLampEquip extends LampEquip {

  public readonly bytes: `{0}{1}{2}000000000200`;
  private readonly brightness: string = '';
  private readonly coldColor: string = '';
  private readonly warmColor: string = '';

  constructor(status: string, primaryType?: string, secondaryType?: string) {
    super(status, primaryType, secondaryType);
    this.brightness = this.status.slice(0, 2);
    this.coldColor = this.status.slice(2, 4);
    this.warmColor = this.isBicolor() ? 'ff' : '00';
  }
  /**
   * 是否双色灯
   */
  public isBicolor() {
    return this.coldColor !== '00';
  }
  /**
   * 是否单色灯
   */
  public isPlainColor() {
    return !this.isBicolor();
  }
  public setBrightness(value: number) {
    if (!value || value < 0 || value > 100) {
      console.warn('value should be 0 ~ 100');
      return;
    }
    this.brightness =
      value === 0 ? '00' : new this.Converter(+value + 154, 10).toHex();
    return this;
  }
  public getBrightness(): number {
    const brightness = this.brightness
      ? new this.Converter(this.brightness, 16).toDecimal()
      : 0;
    return brightness ? brightness - 154 : 0;
  }
  public setColdColor(value: number) {
    if (!value) { return; }
    const coldColor = new this.Converter(
      255 - Math.round(value * 2.55),
      10
    ).toHex();
    this.coldColor = coldColor.length > 10 ? coldColor : `0${coldColor}`;
    return this;
  }
  public getColdColor(): number {
    const coldColor = this.coldColor
      ? new this.Converter(this.coldColor, 16).toDecimal()
      : 0;
    return 100 - Math.round(coldColor / 2.55);
  }
  public setWarmColor() {
    this.warmColor = this.isBicolor() ? 'ff' : '00';
    return this;
  }
  public getWarmColor() {
    return this.warmColor;
  }
  public getBytes() {
    return this.bytes.format(this.brightness, this.coldColor, this.warmColor);
  }
  public getTurnOffBytes() {
    return this.setBrightness(0)
      .setColdColor(0)
      .setWarmColor()
      .getBytes();
  }
  public getTurnOnBytes(bright?: number, cold?: number) {
    return this.setBrightness(bright || 100)
      .setColdColor(cold || 0)
      .setWarmColor()
      .getBytes();
  }
}
