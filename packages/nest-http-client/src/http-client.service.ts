import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { createId } from '@paralleldrive/cuid2';

@Injectable()
export class HttpClientService {
  constructor() {
    console.log('HttpClientService constructor');
  }

  private async makeReques1t(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    body?: any,
    headers?: any,
  ): Promise<any> {
    headers = headers || {};
    if (!headers['x-correlation-id']) headers['x-correlation-id'] = createId();
    try {
      const response = await fetch(url, {
        method: method,
        headers: headers,
        body: body ? JSON.stringify(body) : null,
      });
      return response.json();
    } catch (error) {
      if (error.response) {
        throw new HttpException(error.response.data, error.response.status);
      } else {
        throw new HttpException(
          'Unknown error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  get(url: string, headers?: any) {
    return this.makeRequest('GET', url, null, headers);
  }

  post(url: string, body: any, headers?: any) {
    return this.makeRequest('POST', url, body, headers);
  }

  put(url: string, body: any, headers?: any) {
    return this.makeRequest('PUT', url, body, headers);
  }

  delete(url: string, headers?: any) {
    return this.makeRequest('DELETE', url, null, headers);
  }
}
