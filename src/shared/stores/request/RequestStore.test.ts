import axios from 'axios';
import { beforeEach, describe } from 'vitest';

import { RequestStore } from './RequestStore';

const mockedAxios = vi.mocked(axios, true);

vi.mock('react-toastify', () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

type MockData = {
  user: string;
};

describe('request store test', () => {
  let store: RequestStore<MockData, any[]>;

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('request - success', () => {
    store = new RequestStore(axios.get, undefined);

    expect(store.result).toEqual({ data: null, status: 'idle' });
  });
});
