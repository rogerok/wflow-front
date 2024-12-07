import { ThemeStore } from '../theme/ThemeStore';
import { UiStore } from '../uiStore/UiStore';

export class GlobalStore {
  private _theme = new ThemeStore();
  private _ui = new UiStore();

  // TODO: makeAutoObservable if reativity will be needed

  get ui(): UiStore {
    return this._ui;
  }

  get theme(): ThemeStore {
    return this._theme;
  }
}
