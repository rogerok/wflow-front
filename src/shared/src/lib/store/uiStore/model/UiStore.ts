import { makeAutoObservable } from 'mobx';

class Ui implements UiManager {
  private _isSidebarCollapsed = false;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  toggleNavbarCollapsed = (): void => {
    this._isSidebarCollapsed = !this._isSidebarCollapsed;
  };

  get isNavbarCollapsed(): boolean {
    return this._isSidebarCollapsed;
  }
}

export const UiStore = new Ui();
