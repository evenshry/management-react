declare namespace Login {
  /**
   * 登录参数
   */
  interface LoginParams {
    phoneNumber: string;
    password: string;
  }

  /**
   * 登录结果
   */
  interface LoginResult {
    token: string;
    username: string;
    sellerId: string;
    shopId: string;
  }
}
