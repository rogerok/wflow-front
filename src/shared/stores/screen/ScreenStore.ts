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

export class ScreenStore {
  currentWidth: number = window.innerWidth;

  constructor() {
    makeAutoObservable(this);
    window.addEventListener('resize', this.handleResize);
  }

  handleResize = (): void => {
    this.currentWidth = window.innerWidth;
  };

  isWidthMatchMinByValue = (value: BreakpointsInPxType): boolean => {
    return this.currentWidth >= value;
  };

  isWidthMatchMaxByValue = (value: BreakpointsInPxType): boolean => {
    return this.currentWidth <= value;
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
