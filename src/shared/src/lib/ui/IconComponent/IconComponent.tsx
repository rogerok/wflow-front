import React, { createElement, FC, SVGProps } from 'react';
import { cn } from '@bem-react/classname';
import * as Icons from '../../assets/index';
import './IconComponent.scss';

const cnIconComponent = cn('IconComponent');

const IconSizesMap = {
  sm: {
    width: 24,
    height: 24,
  },
  md: {
    width: 36,
    height: 36,
  },
  lg: {
    width: 48,
    height: 48,
  },
} as const;

export type IconSizes = keyof typeof IconSizesMap;

interface IconComponentBaseProps
  extends Omit<SVGProps<SVGSVGElement>, 'onClick'> {
  name: keyof typeof Icons;
  className?: string;
  onClick?: () => void;
  dataTestId?: string;
}

interface IconComponentWithSizeProps extends IconComponentBaseProps {
  size: IconSizes;
  height?: never;
  width?: never;
}

interface IconComponentNoSize extends IconComponentBaseProps {
  size?: never;
  width: number;
  height: number;
}

type IconProps = IconComponentWithSizeProps | IconComponentNoSize;

export const IconComponent: FC<IconProps> = (props) => {
  const {
    className,
    size,
    name,
    dataTestId = 'IconComponent',
    onClick,
    width,
    height,
    ...restProps
  } = props;

  const sizes = size
    ? IconSizesMap[size]
    : {
        width: props.width,
        height: props.height,
      };

  const Icon = createElement(Icons[props.name], {
    ...restProps,
    ...sizes,
    className: cnIconComponent(undefined, [className]),
  });

  if (props.onClick) {
    return (
      <button
        data-testid={dataTestId}
        className={cnIconComponent('Button')}
        onClick={onClick}
        style={{ width: width, height: height }}
      >
        {Icon}
      </button>
    );
  }
  return Icon;
};
