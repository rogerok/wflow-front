import { cn } from '@bem-react/classname';
import { FC } from 'react';

const cnFeatures = cn('Features');

interface FeaturesProps {
  className?: string;
}

export const Features: FC<FeaturesProps> = (props) => {
  return (
    <div className={cnFeatures(undefined, [props.className])}>Features</div>
  );
};
