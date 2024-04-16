import { fetchData } from './index';

test('fetches data from server when server returns a successful response', async () => {
  const mockSuccessResponse = {};
  const mockJsonPromise = Promise.resolve(mockSuccessResponse);
  const mockFetchPromise = Promise.resolve({
    json: () => mockJsonPromise,
  });
  jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

  const data = await fetchData();

  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(data).toBe(mockSuccessResponse);

  global.fetch.mockClear();
});
