import './ErrorComponent.scss';

import { cn } from '@bem-react/classname';
import { useNavigate } from '@tanstack/react-router';
import { FC } from 'react';

import { routes } from '../../../const/router';
import { Button } from '../Button/Button';
import { Typography } from '../Typography/Typography';
import { VStack } from '../VStack/VStack';

const cnErrorComponent = cn('ErrorComponent');

interface ErrorComponentProps {
  reset: () => void;
}

export const ErrorComponent: FC<ErrorComponentProps> = (props) => {
  const navigate = useNavigate();

  const handleReset = (): void => {
    props.reset();

    navigate({
      to: routes.main(),
    });
  };

  return (
    <VStack
      as={'section'}
      className={cnErrorComponent()}
      flexJustify={'center'}
      align={'center'}
      gap={'32'}
    >
      <Typography as={'h1'} variant={'warn'} align={'center'} size={'xl'}>
        Что-то пошло не так
      </Typography>
      <Button onClick={handleReset}>На главную</Button>
    </VStack>
  );
};
