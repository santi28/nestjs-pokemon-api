import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { HttpAdapter } from '../interfaces/http-adapter.interface';

@Injectable()
export class AxiosAdapter implements HttpAdapter {
  private readonly client: AxiosInstance = axios;

  async get<T>(path: string): Promise<T> {
    try {
      const { data } = await this.client.get<T>(path, {
        headers: { 'Accept-Encoding': 'gzip,deflate,compress' },
      });
      return data;
    } catch (error) {
      throw error;
    }
  }
}
