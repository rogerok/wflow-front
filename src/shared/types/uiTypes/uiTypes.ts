export type Padding = '4' | '8' | '16' | '24' | '32';
export type Margin = '4' | '8' | '16' | '24' | '32' | 'auto';

export interface MarginPadding {
  py?: Padding;
  px?: Padding;
  pt?: Padding;
  pr?: Padding;
  pb?: Padding;
  pl?: Padding;
  mx?: Margin;
  my?: Margin;
  mt?: Margin;
  mr?: Margin;
  mb?: Margin;
  ml?: Margin;
}

export type Alignment = 'start' | 'center' | 'end' | 'stretch';
export type Justify =
  | 'start'
  | 'center'
  | 'end'
  | 'between'
  | 'around'
  | 'evenly';

export type FlexDirection = 'row' | 'column';
export type FlexWrap = 'wrap' | 'nowrap';
export type FlexGap = '4' | '8' | '16' | '24' | '32' | '64';
