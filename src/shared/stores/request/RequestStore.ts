import { AxiosError, AxiosResponse, CanceledError } from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';
import { toast } from 'react-toastify';

import { NotificationText } from '../../const/text/uiText';

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

export type Result<T> =
  | SuccessResult<T>
  | IdleResult
  | ErrorResult
  | LoadingResult;
export type ExecutionResult<T> = SuccessResult<T> | ErrorResult;
export type RequestFn<T, Args extends any[]> = (
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

  showErrorToast(err: unknown): void {
    if (!navigator.onLine) {
      toast.error(NotificationText.connectionError);
      return;
    }

    const errorMsg = this.messages?.error;

    if (errorMsg) {
      toast.error(errorMsg);
    } else if (err instanceof AxiosError) {
      let errorMsg = NotificationText.error();

      if (err.response?.status === 401) {
        errorMsg = NotificationText.authRequired();
      } else if (err.response?.status === 404) {
        errorMsg = NotificationText.notFound();
      } else if (err.response?.status === 500) {
        errorMsg = NotificationText.serverError();
      }

      toast.error(errorMsg);
    }
  }

  showSuccessToast(): void {
    if (this.messages?.success) {
      toast.success(this.messages.success);
    }
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
        this.showSuccessToast();
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
          this.showErrorToast(err);
        }
      });
    }

    return this.result as unknown as ExecutionResult<T>;
  };

  get isLoading(): boolean {
    return this.result.status === RequestStatusesConstant.Loading;
  }
}
