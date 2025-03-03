import { RouterType } from 'src/shared/types/router';

class Router {
  private _router?: RouterType;

  init = (router: RouterType): void => {
    this._router = router;
  };

  get router(): RouterType | undefined {
    return this._router;
  }
}

export const AppRouter = new Router();
