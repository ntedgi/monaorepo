import { HttpClientService } from './http-client.service';

describe('HttpClientService', () => {
  let httpClientService = null;

  beforeEach(() => {
    httpClientService = new HttpClientService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should send a GET request', async () => {
    const url = 'https://api.example.com/data';
    const headers = { 'Content-Type': 'application/json' };
    const responseBody = { data: '12345' };
    const responseStatus = 200;

    const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(responseBody),
      status: responseStatus,
    } as any);

    const result = await httpClientService.get(url, headers);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(url, {
      method: 'GET',
      headers,
      body: null,
    });

    expect(result).toEqual(responseBody);
  });

  it('should send a POST request', async () => {
    const url = 'https://api.example.com/data';
    const headers = { 'Content-Type': 'application/json' };
    const body = { data: 'test' };
    const responseBody = { success: true };
    const responseStatus = 201;

    const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(responseBody),
      status: responseStatus,
    } as any);

    const result = await httpClientService.post(url, body, headers);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    expect(result).toEqual(responseBody);
  });

  it('should send a DELETE request', async () => {
    const url = 'https://api.example.com/data';
    const headers = { 'Content-Type': 'application/json' };
    const responseBody = { success: true };
    const responseStatus = 204;

    const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(responseBody),
      status: responseStatus,
    } as any);

    const result = await httpClientService.delete(url, headers);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(url, {
      method: 'DELETE',
      headers,
      body: null,
    });

    expect(result).toEqual(responseBody);
  });

  it('should send a PUT request', async () => {
    const url = 'https://api.example.com/data';
    const headers = { 'Content-Type': 'application/json' };
    const body = { data: 'test' };
    const responseBody = { success: true };
    const responseStatus = 201;

    const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(responseBody),
      status: responseStatus,
    } as any);

    const result = await httpClientService.put(url, body, headers);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(url, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body),
    });

    expect(result).toEqual(responseBody);
  });

  it('should handle errors', async () => {
    const url = 'https://api.example.com/data';
    const headers = { 'Content-Type': 'application/json' };
    const errorMessage = 'Internal Server Error';
    const errorStatus = 500;

    const fetchMock = jest.spyOn(global, 'fetch').mockRejectedValueOnce({
      response: {
        data: errorMessage,
        status: errorStatus,
      },
    } as any);

    try {
      await httpClientService.get(url, headers);
    } catch (error) {
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(fetchMock).toHaveBeenCalledWith(url, {
        method: 'GET',
        headers,
        body: null,
      });

      expect(error).toBeInstanceOf(Error);
      expect(error.response).toEqual(errorMessage);
      expect(error.status).toEqual(errorStatus);
    }
  });

  it('should handle errors without response', async () => {
    const url = 'https://api.example.com/data';
    const headers = { 'Content-Type': 'application/json' };
    const fetchMock = jest.spyOn(global, 'fetch').mockRejectedValueOnce({
      message: 'Bla Bla Bla',
    } as any);

    try {
      await httpClientService.get(url, headers);
    } catch (error) {
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(fetchMock).toHaveBeenCalledWith(url, {
        method: 'GET',
        headers,
        body: null,
      });

      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual('Unknown error');
    }
  });

  it('should attach x-correlation-id header to existing headers', async () => {
    const url = 'https://api.example.com/data';
    const headers = { 'Content-Type': 'application/json' };
    const responseBody = { data: '12345' };
    const responseStatus = 200;

    const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(responseBody),
      status: responseStatus,
    } as any);

    const result = await httpClientService.get(url, headers);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(url, {
      method: 'GET',
      headers: {
        ...headers,
        'x-correlation-id': expect.any(String),
      },
      body: null,
    });

    expect(result).toEqual(responseBody);
  });

  it('should attach empty headers if none passed', async () => {
    const url = 'https://api.example.com/data';
    const responseBody = { data: '12345' };
    const responseStatus = 200;

    const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(responseBody),
      status: responseStatus,
    } as any);

    const result = await httpClientService.get(url, null);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(url, {
      method: 'GET',
      headers: {
        'x-correlation-id': expect.any(String),
      },
      body: null,
    });

    expect(result).toEqual(responseBody);
  });
});
