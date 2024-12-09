import { makeAutoObservable } from 'mobx';
import { ObjectValues } from '../../lib/tsUtils/ObjectValues';

const BreakpointsInPxConstant = {
  Xs: 0,
  Sm: 480,
  Md: 768,
  Lg: 1024,
  Xl: 1200,
} as const;

export type BreakpointsInPxType = ObjectValues<typeof BreakpointsInPxConstant>;

export class Screen {
  constructor() {
    makeAutoObservable(this);
  }

  isWidthMatchMinByValue = (value: BreakpointsInPxType): boolean => {
    return window.matchMedia(`(min-width: ${value}px)`).matches;
  };

  get upXs(): boolean {
    return this.isWidthMatchMinByValue(BreakpointsInPxConstant.Xs);
  }

  get upSm(): boolean {
    return this.isWidthMatchMinByValue(BreakpointsInPxConstant.Sm);
  }

  get upMd(): boolean {
    return this.isWidthMatchMinByValue(BreakpointsInPxConstant.Md);
  }

  get upLg(): boolean {
    return this.isWidthMatchMinByValue(BreakpointsInPxConstant.Lg);
  }

  get upXl(): boolean {
    return this.isWidthMatchMinByValue(BreakpointsInPxConstant.Xl);
  }

  preventScroll = (): void => {
    document.body.style.overflow = 'hidden';
  };

  enableScroll = (): void => {
    document.body.style.overflow = 'auto';
  };
}

export const ScreenStore = new Screen();
