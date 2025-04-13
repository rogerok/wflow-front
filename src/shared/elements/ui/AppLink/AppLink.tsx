import './AppLink.scss';

import { cn } from '@bem-react/classname';
import { createLink, LinkComponent } from '@tanstack/react-router';
import { AnchorHTMLAttributes, forwardRef, ReactNode } from 'react';

const cnAppLink = cn('AppLink');
type AppLinkVariant = 'primary' | 'secondary' | 'outline';

interface AppLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  className?: string;
  variant?: AppLinkVariant;
  dataTestId?: string;
}

const Link = forwardRef<HTMLAnchorElement, AppLinkProps>((props, ref) => {
  const { dataTestId = 'link', variant = 'primary', className } = props;

  return (
    <a
      {...props}
      ref={ref}
      data-testid={dataTestId}
      className={cnAppLink({ [variant]: true }, [className])}
    />
  );
});

const CreatedLink = createLink(Link);

export const AppLink: LinkComponent<typeof Link> = (props) => {
  return <CreatedLink {...props} />;
};
