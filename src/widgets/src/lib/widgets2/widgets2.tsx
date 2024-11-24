import { cn } from '@bem-react/classname';
import { FC } from 'react';

const cnWidgets2 = cn('Widgets2');

interface Widgets2Props {
  className?: string;
}

export const Widgets2: FC<Widgets2Props> = (props) => {
  return (
    <div className={cnWidgets2(undefined, [props.className])}>Widgets2</div>
  );
};
