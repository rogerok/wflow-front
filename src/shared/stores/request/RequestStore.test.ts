import axios from 'axios';
import { when } from 'mobx';
import { toast } from 'react-toastify';
import { beforeEach, describe } from 'vitest';

import { RequestStore } from './RequestStore';

type MockData = {
  user: string;
};
const mockData: MockData = {
  user: 'John Doe',
};

vi.mock('axios');
const mockedAxios = vi.mocked(axios, true);

vi.mock('react-toastify', () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

describe('request store test', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('request - success', async () => {
    mockedAxios.get.mockReturnValue(Promise.resolve({ data: mockData }));

    const store = new RequestStore<MockData>(() => mockedAxios.get(''), {
      success: 'success',
    });

    expect(store.result).toEqual({ data: null, status: 'idle' });

    store.call();

    expect(store.isLoading).toBe(true);
    expect(store.result).toEqual({ data: null, status: 'loading' });

    await when(() => store.result.status === 'success');
    expect(store.result).toEqual({
      data: mockData,
      status: 'success',
    });

    expect(toast.success).toHaveBeenCalledWith('success');
  });

  it('request - success', async () => {
    const error = new Error('something went wrong');
    mockedAxios.get.mockRejectedValue(error);

    const store = new RequestStore<MockData>(() => mockedAxios.get(''));

    expect(store.result).toEqual({ data: null, status: 'idle' });

    store.call();

    expect(store.isLoading).toBe(true);
    expect(store.result).toEqual({ data: null, status: 'loading' });

    await when(() => store.result.status === 'error');
    expect(store.result).toEqual({
      data: null,
      status: 'error',
      error,
    });
  });
});
