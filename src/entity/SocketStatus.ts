import { Status } from './Status'
export class SocketStatus extends Status{
  plugStatus: string = ''
  touchStatus: string = ''
  mixupStatus: string = ''
  sceneStatus: string = ''
  state: string = ''
  constructor(status:string) {
    super(status)
    this.plugStatus = status.slice(0, 2)
    this.touchStatus = status.slice(0, 2)
    this.mixupStatus = status.slice(2, 4)
    this.sceneStatus = status.slice(6, 8)
    this.state = status.slice(6, 8)
  }
  setState (state:string) {
    if (state.length < 2) console.warn('two bytes needed!')
    this.state = state
  }
  getState () {
    return this.state
  }
  getPlugStatus () {
    return this.plugStatus
  }
  getTouchStatus () {
    return this.touchStatus
  }
  getMixupStatus () {
    return this.mixupStatus
  }
  getSceneStatus () {
    return this.sceneStatus
  }
}
