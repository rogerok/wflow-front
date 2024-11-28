import React, { FC, SVGProps } from 'react';
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
  const { className, size, name, onClick, width, height, ...restProps } = props;

  const sizes = size
    ? IconSizesMap[size]
    : {
        width: props.width,
        height: props.height,
      };

  const Icon = Icons[props.name];

  const iconComp = (
    <Icon
      className={cnIconComponent(undefined, [className])}
      {...sizes}
      {...restProps}
    />
  );

  if (props.onClick) {
    return (
      <button
        className={cnIconComponent('Button')}
        onClick={onClick}
        style={{ width: width, height: height }}
      >
        {iconComp}
      </button>
    );
  }
  return iconComp;
};
