export interface HttpAdapter {
  get<T>(path: string): Promise<T>;
}
