import { cn } from '@bem-react/classname';
import { Link } from '@tanstack/react-router';
import { ComponentProps, FC } from 'react';

import { Button, ButtonBaseProps, ButtonProps } from '../Button/Button';

const cnButtonLink = cn('ButtonLink');

type ButtonLinkProps = ComponentProps<typeof Link> & ButtonBaseProps;

export const ButtonLink: FC<ButtonLinkProps> = (props) => {
  return (
    <Button
      {...props}
      component={Link}
      type={'submit'}
      className={cnButtonLink(undefined, [props.className])}
    >
      {props.children}
    </Button>
  );
};
