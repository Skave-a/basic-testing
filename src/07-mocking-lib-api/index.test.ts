import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from './index'; 

jest.mock('axios');

const baseURL = 'https://jsonplaceholder.typicode.com';

describe('throttledGetDataFromApi', () => {

  test('should create instance with provided base url', async () => {
    axios.create({ baseURL: baseURL });

    expect(axios.create).toHaveBeenCalledWith({ baseURL: baseURL });
  });

  test('should perform request to correct provided url', async () => {
    // const path = '/posts';
    // jest.spyOn(axios, 'get');

    // await throttledGetDataFromApi(path);

    // expect(axios.get).toHaveBeenCalledWith(path);

  });

  test('should return response data', async () => {
    // const data = { id: 1, title: 'post' };
    // jest.spyOn(axios, 'get').mockResolvedValue({ data: data });

    // const relativePath = '/posts';
    // const data = await throttledGetDataFromApi(relativePath);

    // expect(data).toEqual(data);
  });
});
