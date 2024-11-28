import { FC } from 'react';
import { cn } from '@bem-react/classname';

const cnFlex = cn('Flex');

export type FlexJustify = 'start' | 'center' | 'end' | 'between';
export type FlexAlign = 'start' | 'center' | 'end' | 'between';
export type FlexDirection = 'row' | 'column';
export type FlexWrap = 'wrap' | 'nowrap';
export type FlexGap = '4' | '8' | '16' | '24' | '32';

interface FlexProps {
  className?: string;
  fullWidth?: boolean;
}

export const Flex: FC<FlexProps> = (props) => {
  return <div className={cnFlex(undefined, [props.className])}>Flex</div>;
};
