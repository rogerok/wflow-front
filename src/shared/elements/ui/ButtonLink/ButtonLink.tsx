import { cn } from '@bem-react/classname';
import { createLink, LinkComponent } from '@tanstack/react-router';
import { FC } from 'react';

import { Button, ButtonProps } from '../Button/Button';

const cnButtonLink = cn('ButtonLink');

interface ButtonLinkProps extends ButtonProps<'a'> {
  className?: string;
}

export const ButtonAsLink: FC<ButtonLinkProps> = (props) => {
  return (
    <Button
      {...props}
      as={'a'}
      className={cnButtonLink(undefined, [props.className])}
    />
  );
};

const CreatedLink = createLink(ButtonAsLink);

export const ButtonLink: LinkComponent<typeof CreatedLink> = (props) => {
  return <CreatedLink {...props} />;
};
