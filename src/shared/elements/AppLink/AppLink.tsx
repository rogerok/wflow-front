import './AppLink.scss';

import { cn } from '@bem-react/classname';
import { Link } from '@tanstack/react-router';
import { ComponentProps, FC, memo } from 'react';

const cnAppLink = cn('AppLink');
type AppLinkVariant = 'primary' | 'secondary' | 'outline';

type AppLinkProps = {
  className?: string;
  variant?: AppLinkVariant;
} & ComponentProps<typeof Link>;

export const AppLink: FC<AppLinkProps> = memo((props) => {
  const { variant = 'primary', className } = props;

  return (
    <Link
      {...props}
      className={cnAppLink(
        {
          [variant]: true,
        },
        [className]
      )}
    />
  );
});
