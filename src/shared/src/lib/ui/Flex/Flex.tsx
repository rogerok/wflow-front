import { DetailedHTMLProps, FC, HTMLAttributes, ReactNode } from 'react';
import { cn } from '@bem-react/classname';
import './Flex.scss';

const cnFlex = cn('Flex');

export type FlexJustify = 'start' | 'center' | 'end' | 'between';
export type FlexAlign = 'start' | 'center' | 'end';
export type FlexDirection = 'row' | 'column';
export type FlexWrap = 'wrap' | 'nowrap';
export type FlexGap = '4' | '8' | '16' | '24' | '32';

export interface FlexProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  align?: FlexAlign;
  children: ReactNode;
  className?: string;
  direction?: FlexDirection;
  flexJustify?: FlexJustify;
  fullWidth?: boolean;
  gap?: FlexGap;
  wrap?: FlexWrap;
}

export const Flex: FC<FlexProps> = (props) => {
  const {
    align = 'start',
    children,
    className,
    direction = 'row',
    flexJustify = 'start',
    fullWidth = false,
    gap,
    wrap = 'wrap',
    ...otherProps
  } = props;

  return (
    <div
      className={cnFlex(
        {
          align: align,
          direction: direction,
          fullWidth: fullWidth,
          gap: gap,
          justify: flexJustify,
          wrap: wrap,
        },
        [className]
      )}
      {...otherProps}
    >
      {children}
    </div>
  );
};
