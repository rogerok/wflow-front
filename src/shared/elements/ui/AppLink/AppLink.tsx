import './AppLink.scss';

import { cn } from '@bem-react/classname';
import { createLink, LinkComponent } from '@tanstack/react-router';
import { AnchorHTMLAttributes, forwardRef, ReactNode } from 'react';

const cnAppLink = cn('AppLink');
type AppLinkVariant = 'primary' | 'secondary' | 'outline';

interface AppLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string;
  variant?: AppLinkVariant;
  children: ReactNode;
}

const Link = forwardRef<HTMLAnchorElement, AppLinkProps>((props, ref) => {
  const { variant = 'primary', className } = props;

  return (
    <a
      ref={ref}
      {...props}
      className={cnAppLink({ [variant]: true }, [className])}
    />
  );
});

const CreatedLink = createLink(Link);

export const AppLink: LinkComponent<typeof Link> = (props) => {
  return <CreatedLink {...props} />;
};
