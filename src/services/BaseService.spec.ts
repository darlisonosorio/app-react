import "@testing-library/jest-dom";

jest.mock('../constants', () => ({
  VITE_API_URL: 'http://localhost:3000',
}));


import BaseService from "./BaseService";
import api from "./Api";
import type { AxiosResponse } from "axios";

jest.mock("./Api");

describe("BaseService", () => {
  const mockApi = api as jest.Mocked<typeof api>;
  const service = new BaseService("/test");

  const mockResponse: AxiosResponse = {
    data: { message: "ok" },
    status: 200,
    statusText: "OK",
    headers: {},
    config: { headers: {} as any },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call GET with correct URL", async () => {
    mockApi.get.mockResolvedValue(mockResponse);

    const res = await service.get("/endpoint");
    expect(mockApi.get).toHaveBeenCalledWith("/test/endpoint", undefined);
    expect(res).toEqual(mockResponse);
  });

  it("should call POST with correct URL and data", async () => {
    mockApi.post.mockResolvedValue(mockResponse);

    const res = await service.post("/endpoint", { foo: "bar" });
    expect(mockApi.post).toHaveBeenCalledWith("/test/endpoint", { foo: "bar" }, undefined);
    expect(res).toEqual(mockResponse);
  });

  it("should call PUT with correct URL and data", async () => {
    mockApi.put.mockResolvedValue(mockResponse);

    const res = await service.put("/endpoint", { foo: "bar" });
    expect(mockApi.put).toHaveBeenCalledWith("/test/endpoint", { foo: "bar" }, undefined);
    expect(res).toEqual(mockResponse);
  });

  it("should call DELETE with correct URL", async () => {
    mockApi.delete.mockResolvedValue(mockResponse);

    const res = await service.delete("/endpoint");
    expect(mockApi.delete).toHaveBeenCalledWith("/test/endpoint", undefined);
    expect(res).toEqual(mockResponse);
  });
});
