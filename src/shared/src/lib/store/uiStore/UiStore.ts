import { makeAutoObservable } from 'mobx';
import { UiManager } from './UiManager';

export class UiStore implements UiManager {
  private _isNavbarCollapsed = false;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  toggleNavbar = (): void => {
    this._isNavbarCollapsed = !this._isNavbarCollapsed;
  };

  get isNavbarCollapsed(): boolean {
    return this._isNavbarCollapsed;
  }
}
