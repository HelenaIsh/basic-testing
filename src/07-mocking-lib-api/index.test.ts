// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock("axios");
jest.mock('lodash', () => ({
  throttle: jest.fn((fn) => fn),
}));

describe('throttledGetDataFromApi', () => {
  const mockData = { id: 1, title: 'Test Post' };
  beforeEach(() => {
    (axios.create as jest.Mock).mockReturnThis();
    (axios.get as jest.Mock).mockResolvedValue({data: mockData});
  })
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi('/posts/1');

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });  
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi('/posts/1');

    expect(axios.get).toHaveBeenCalledWith('/posts/1');
  });

  test('should return response data', async () => {
    const result = await throttledGetDataFromApi('/posts/1');

    expect(result).toBe(mockData);
  });
});
