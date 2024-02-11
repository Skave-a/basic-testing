import axios, { Axios } from 'axios';
import { THROTTLE_TIME, throttledGetDataFromApi } from './index';

const baseURL = 'https://jsonplaceholder.typicode.com';
const relativePath = '/posts';
const responseData = [{ id: 1, name: 'name' }];

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(async () => {
    jest.clearAllMocks();
    jest.advanceTimersByTime(THROTTLE_TIME);

    jest.spyOn(axios, 'create');

    jest
      .spyOn(Axios.prototype, 'get')
      .mockResolvedValueOnce({ data: responseData });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create an instance with the provided base URL', async () => {
    await throttledGetDataFromApi(relativePath);

    expect(axios.create).toHaveBeenCalledWith({
      baseURL,
    });
  });

  test('should perform a request to the correct provided URL', async () => {
    await throttledGetDataFromApi(relativePath);

    expect(Axios.prototype.get).toHaveBeenCalledWith(relativePath);
  });

  test('should return the response data', async () => {
    const result = await throttledGetDataFromApi(relativePath);

    expect(result).toEqual(responseData);
  });
});
