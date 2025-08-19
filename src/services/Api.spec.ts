import "@testing-library/jest-dom";

jest.mock('../constants', () => ({
  VITE_API_URL: 'http://localhost:3000',
}));

import api from "./Api";
import { store } from "../store";

jest.mock("../store", () => ({
  store: { getState: jest.fn() },
}));

describe("api instance", () => {
  it("sets Authorization header if loggedUser token exists", () => {
    (store.getState as jest.Mock).mockReturnValue({
      loggedUser: { token: "fake-token" },
    });

    const requestInterceptor: any = api.interceptors.request as any;

    const config = requestInterceptor.handlers[0].fulfilled({ headers: {} });
    expect(config.headers.Authorization).toBe("Bearer fake-token");
  });

  it("does not set Authorization header if no loggedUser", () => {
    (store.getState as jest.Mock).mockReturnValue({ loggedUser: null });

    const requestInterceptor: any = api.interceptors.request as any;

    const config = requestInterceptor.handlers[0].fulfilled({ headers: {} });
    expect(config.headers.Authorization).toBeUndefined();
  });
});
