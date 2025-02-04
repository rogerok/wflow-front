import { AxiosError, AxiosResponse, CanceledError } from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';

const RequestStatusesConstant = {
  Idle: 'idle',
  Loading: 'loading',
  Error: 'error',
  Success: 'success',
} as const;

type SuccessResult<T> = {
  data: T;
  status: typeof RequestStatusesConstant.Success;
};
type IdleResult = { data: null; status: typeof RequestStatusesConstant.Idle };
type ErrorResult = {
  data: null;
  status: typeof RequestStatusesConstant.Error;
  error: unknown;
};
type LoadingResult = {
  data: null;
  status: typeof RequestStatusesConstant.Loading;
};

type Result<T> = SuccessResult<T> | IdleResult | ErrorResult | LoadingResult;
type ExecutionResult<T> = SuccessResult<T> | ErrorResult;
type RequestFn<T, Args extends any[]> = (
  ...args: Args
) => Promise<AxiosResponse<T>>;

type RequestMessage = {
  success?: string;
  error?: string;
};

export class RequestStore<T, Args extends any[] = []> {
  result: Result<T> = {
    data: null,
    status: 'idle',
  };

  requestFn: RequestFn<T, Args>;
  messages?: RequestMessage;

  constructor(requestFn: RequestFn<T, Args>, messages?: RequestMessage) {
    this.requestFn = requestFn;
    this.messages = messages;

    makeAutoObservable(
      this,
      { requestFn: false, messages: false },
      { autoBind: true },
    );
  }

  call = async (...args: Args): Promise<ExecutionResult<T>> => {
    this.result = {
      status: 'loading',
      data: null,
    };

    try {
      const result = await this.requestFn(...args);
      runInAction(() => {
        this.result = {
          data: result.data,
          status: 'success',
        };
      });
    } catch (err: unknown) {
      runInAction(() => {
        if (
          (err instanceof AxiosError && err.code === 'ECONNABORTED') ||
          err instanceof CanceledError
        ) {
          return;
        } else {
          this.result = {
            data: null,
            error: err,
            status: 'error',
          };
        }
      });
    }

    return this.result as unknown as ExecutionResult<T>;
  };

  get isLoading(): boolean {
    return this.result.status === RequestStatusesConstant.Loading;
  }
}
