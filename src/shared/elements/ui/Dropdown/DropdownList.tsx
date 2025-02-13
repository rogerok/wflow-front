import { cn } from '@bem-react/classname';
import { FC } from 'react';

const cnDropdownList = cn('DropdownList');

interface DropdownListProps {
  className?: string;
}

export const DropdownList: FC<DropdownListProps> = (props) => {
  return (
    <div className={cnDropdownList(undefined, [props.className])}>
      DropdownList
    </div>
  );
};
