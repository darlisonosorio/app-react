import type { Login } from "../models/login";
import type { UserDetail } from "../models/userDetails";
import BaseService from "./BaseService";

class AuthService extends BaseService {
  constructor() {
    super("/auth");
  }

  async login(login: Partial<Login>) {
    const response = await this.post<UserDetail>("/login", login);
    return response.data;
  }

}

export default new AuthService();
