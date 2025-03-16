import './Skeleton.scss';

import { cn } from '@bem-react/classname';
import { CSSProperties, FC, ReactElement, ReactNode } from 'react';

const cnSkeleton = cn('Skeleton');

type Rounded = 1 | 2 | 3 | 4 | 5 | 6;

interface SkeletonProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  borderRadius?: string | number;
  rounded?: Rounded;
  animation?: 'pulse' | 'wave' | 'none';
  variant?: 'circle' | 'none';
  style?: CSSProperties;
  children?: ReactNode;
  count?: number;
  inline?: boolean;
}

const convertToRem = (value?: string | number): string | undefined => {
  if (value) {
    return typeof value === 'number' ? `${value}rem` : value;
  }
};

export const Skeleton: FC<SkeletonProps> = (props) => {
  const {
    width,
    height,
    borderRadius,
    animation = 'pulse',
    variant = 'none',
    className,
    style = {},
    children,
    count = 1,
    rounded,
    inline = false,
  } = props;

  const styles: CSSProperties = {
    width: convertToRem(width),
    height: convertToRem(height),
    borderRadius: convertToRem(borderRadius),
    ...style,
  };

  const createSkeleton = (key: number): ReactElement => (
    <div
      key={key}
      className={cnSkeleton(
        {
          animation,
          variant,
          inline: inline ? 'yes' : undefined,
          rounded,
        },
        [className],
      )}
      style={styles}
    >
      {children}
    </div>
  );

  if (count > 1) {
    return (
      <>{Array.from({ length: count }, (_, index) => createSkeleton(index))}</>
    );
  }

  return createSkeleton(0);
};
