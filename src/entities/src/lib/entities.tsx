import { cn } from '@bem-react/classname';
import { FC } from 'react';

const cnEntities = cn('Entities');

interface EntitiesProps {
  className?: string;
}

export const Entities: FC<EntitiesProps> = (props) => {
  return (
    <div className={cnEntities(undefined, [props.className])}>Entities</div>
  );
};
