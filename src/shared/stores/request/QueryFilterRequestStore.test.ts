import { $api } from '../../api/api';
import {
  PaginationParams,
  QueryFilterRequestStore,
} from './QueryFilterRequestStore';

vi.mock('./RequestStore', () => {
  return {
    RequestStore: vi.fn().mockImplementation(() => {
      return {
        call: vi.fn().mockResolvedValue({
          status: 'success',
          data: [{ user: 'John Doe' }],
        }),
        isLoading: false,
        result: {
          status: 'success',
          data: [{ user: 'John Doe' }],
        },
      };
    }),
  };
});

vi.mock('../../api/api');
const mockedApi = vi.mocked($api, true);

type MockData = {
  user: string;
};

const params: PaginationParams = {
  page: 1,
  perPage: 10,
  orderBy: 'createdAt desc',
};

describe('QueryFilterRequestStore tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('initial', () => {
    const store = new QueryFilterRequestStore<PaginationParams, MockData>(
      (params: PaginationParams) =>
        mockedApi.get('', {
          params,
        }),
      params,
    );

    expect(store.params).toEqual(params);
    expect(store.isLoading).toBe(false);
    expect(store.currentPage).toBe(1);
    expect(store.perPage).toBe(10);
    expect(store.total).toBe(1);
  });

  it('success', async () => {
    const callSpy = vi.spyOn(QueryFilterRequestStore.prototype, 'call');

    const store = new QueryFilterRequestStore<PaginationParams, MockData>(
      (params: PaginationParams) =>
        mockedApi.get('', {
          params,
        }),
      params,
    );

    await store.nextPage();

    expect(store.params.page).toBe(2);
    expect(store.total).toBe(1);
    expect(callSpy).toHaveBeenCalled();

    callSpy.mockRestore();
  });

  it('aborts previous request when new one is made', async () => {
    const store = new QueryFilterRequestStore<PaginationParams, MockData>(
      (params: PaginationParams) =>
        $api.get('', {
          params,
        }),
      params,
    );

    const abortMock = vi.fn();
    store.abortController = { abort: abortMock } as unknown as AbortController;

    await store.call();

    expect(abortMock).toHaveBeenCalled();
    expect(store.abortController).not.toBeNull();
  });

  it('handles prevPage', async () => {
    const store = new QueryFilterRequestStore<PaginationParams, MockData>(
      (params: PaginationParams) =>
        $api.get('', {
          params,
        }),
      { ...params, page: 2 },
    );

    await store.prevPage();

    expect(store.params.page).toBe(1);
  });
});
