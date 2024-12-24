import { ObjectValues } from '@shared';
import { makeAutoObservable } from 'mobx';

const BreakpointsInPxConstant = {
  Xs: 0,
  Sm: 480,
  Md: 768,
  Lg: 1024,
  Xl: 1200,
} as const;

export type BreakpointsInPxType = ObjectValues<typeof BreakpointsInPxConstant>;

export class ScreenStore {
  constructor() {
    makeAutoObservable(this);
  }

  isWidthMatchMinByValue = (value: BreakpointsInPxType): boolean => {
    return window.matchMedia(`(min-width: ${value}px)`).matches;
  };

  isWidthMatchMaxByValue = (value: BreakpointsInPxType): boolean => {
    return window.matchMedia(`(max-width: ${value}px)`).matches;
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

  get downXs(): boolean {
    return this.isWidthMatchMaxByValue(BreakpointsInPxConstant.Xs);
  }

  get downSm(): boolean {
    return this.isWidthMatchMaxByValue(BreakpointsInPxConstant.Sm);
  }

  get downMd(): boolean {
    return this.isWidthMatchMaxByValue(BreakpointsInPxConstant.Md);
  }

  get downLg(): boolean {
    return this.isWidthMatchMaxByValue(BreakpointsInPxConstant.Lg);
  }

  get downXl(): boolean {
    return this.isWidthMatchMaxByValue(BreakpointsInPxConstant.Xl);
  }
}
