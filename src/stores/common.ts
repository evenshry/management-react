import { observable, action } from 'mobx';

export class CommonStore {
  // 查询参数
  @observable
  public token: string = 'token';

  @action
  public setToken = (value: string): void => {
    this.token = value;
  }
}

export default new CommonStore();
