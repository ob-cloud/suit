import Suiter, { SuitStatus, SuitTypes } from '../utils/suiter';
import TypeHints from '../utils/typeHints';
import Converter from '../utils/converter';

export class BaseEquip {
  public readonly Suiter = {};
  public readonly SuitStatus = {};
  public readonly SuitTypes = {};
  public readonly TypeHints = {};
  public readonly Converter = {};
  constructor() {
    this.Suiter = Suiter;
    this.SuitStatus = SuitStatus;
    this.SuitTypes = SuitTypes;
    this.TypeHints = TypeHints;
    this.Converter = Converter;
  }

  public getPrimaryStatusCode(mainDevType: string, status: string): string {
    if (!mainDevType || !status) {
      console.warn('primary device type or status can not be empty!');
      return '';
    }
    return `${mainDevType}${status}`;
  }

  public getSecondaryStatusCode(
    mainDevType: string,
    secondarySubType: string,
    status: string
  ): string {
    if (!mainDevType || !secondarySubType || !status) {
      console.warn('device type or status can not be empty!');
      return '';
    }
    return `${mainDevType}${secondarySubType}${status}`;
  }

  public getDescriptorByCode(code: string): string {
    if (!code) { console.warn('key code can not be empty!'); }
    return (this.SuitStatus as any)[code];
  }

  public getMainDescriptor(mainDevType: string, code: string): string {
    return this.getDescriptorByCode(
      this.getPrimaryStatusCode(mainDevType, code)
    );
  }

  public getDescriptors(
    mainDevType: string,
    statusBitStr: string,
    separator: string = ','
  ): string {
    let descriptor: Array<any> = [];
    for (let i = statusBitStr.length; i > 0; i -= 2) {
      const statusBit = statusBitStr.slice(i - 2, i);
      descriptor.push(
        this.getDescriptorByCode(
          this.getPrimaryStatusCode(mainDevType, statusBit)
        )
      );
    }
    return descriptor.join(separator);
  }
}
