import axios from 'axios';
import { beforeEach, describe } from 'vitest';

import { RequestStore } from './RequestStore';

vi.mock('axios');

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
    vi.clearAllMocks();
  });

  it('request - success', () => {
    store = new RequestStore(axios.get, undefined);

    expect(store.result).toEqual({ data: null, status: 'idle' });
  });
});
