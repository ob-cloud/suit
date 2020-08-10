import Suiter, {SuitStatus, SuitTypes} from '../utils/suiter'
import TypeHints from '../utils/typeHints'
import { Converter } from '../utils/converter'

export class BaseEquip {
  Suiter = {}
  SuitStatus = {}
  SuitTypes = {}
  TypeHints = {}
  Converter = null
  constructor(){
    this.Suiter = Suiter
    this.SuitStatus = SuitStatus
    this.SuitTypes = SuitTypes
    this.TypeHints = TypeHints
    this.Converter = Converter
  }

  getPrimaryStatusCode (mainDevType:string, status: string): string {
    if(!mainDevType || !status) {
      console.warn('primary device type or status can not be empty!')
      return ''
    }
    return `${mainDevType}${status}`
  }

  getSecondaryStatusCode (mainDevType:string, secondarySubType:string, status:string):string {
    if(!mainDevType || !secondarySubType || !status) {
      console.warn('device type or status can not be empty!')
      return ''
    }
    return `${mainDevType}${secondarySubType}${status}`
  }

  getDescriptorByCode (code: string): string {
    if (!code) console.warn('key code can not be empty!')
    return this.SuitStatus[code]
  }

  getMainDescriptor (mainDevType:string, code:string):string {
    return this.getDescriptorByCode(this.getPrimaryStatusCode(mainDevType, code))
  }

  getDescriptors (mainDevType: string, statusBitStr:string, separator: string = ','): string {
    const descriptor  = []
    for (let i = statusBitStr.length; i > 0; i -= 2) {
      let statusBit = statusBitStr.slice(i - 2, i)
      descriptor.push(this.getDescriptorByCode(this.getPrimaryStatusCode(mainDevType, statusBit)))
    }
    return descriptor.join(separator)
  }
}
