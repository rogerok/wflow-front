import './IconComponent.scss';

import { cn } from '@bem-react/classname';
import React, {
  createElement,
  CSSProperties,
  FC,
  MouseEvent,
  SVGProps,
} from 'react';

import * as Icons from '../../../assets';
import { CssVarsMapType } from '../../../types/theme';

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
  color?: CssVarsMapType;
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
    color,
    ...restProps
  } = props;

  const sizes = size
    ? IconSizesMap[size]
    : {
        width: width,
        height: height,
      };

  const iconStyles: CSSProperties = {
    color: color ? `var(--${color})` : undefined,
  };

  const Icon = createElement(Icons[name], {
    ...restProps,
    ...sizes,
    style: iconStyles,
    className: cnIconComponent(undefined, [className]),
  });

  const handleClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    onClick?.();
  };

  if (onClick) {
    return (
      <button
        data-testid={dataTestId}
        className={cnIconComponent(undefined, [className, 'IconButton'])}
        onClick={handleClick}
        style={{ width: sizes.width, height: sizes.height }}
      >
        {Icon}
      </button>
    );
  }
  return Icon;
};
