import { Status } from './Status';
export class SocketStatus extends Status {
  /**
   * 开关插座状态
   */
  public readonly plugStatus: string = '';
  /**
   * 触摸面板状态
   */
  public readonly touchStatus: string = '';
  /**
   * 混合面板
   */
  public readonly mixupStatus: string = '';
  /**
   * 场景面板
   */
  public readonly sceneStatus: string = '';
  public state: string = '';
  constructor(status: string) {
    super(status);
    this.plugStatus = status.slice(0, 2);
    this.touchStatus = status.slice(0, 2);
    this.mixupStatus = status.slice(2, 4);
    this.sceneStatus = status.slice(6, 8);
    this.state = status.slice(6, 8);
  }
  public setState(state: string) {
    if (state.length < 2) { console.warn('two bytes needed!'); }
    this.state = state;
  }
  public getState() {
    return this.state;
  }
  public getPlugStatus() {
    return this.plugStatus;
  }
  public getTouchStatus() {
    return this.touchStatus;
  }
  public getMixupStatus() {
    return this.mixupStatus;
  }
  public getSceneStatus() {
    return this.sceneStatus;
  }
}
