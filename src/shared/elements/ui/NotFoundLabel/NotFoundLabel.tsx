import { cn } from '@bem-react/classname';
import { FC } from 'react';

import { Box } from '../Box/Box';
import { Typography } from '../Typography/Typography';

const cnNotFoundLabel = cn('NotFoundLabel');

interface NotFoundLabelProps {
  className?: string;
}

export const NotFoundLabel: FC<NotFoundLabelProps> = (props) => {
  return (
    <Box as={'p'} fullWidth py={'32'}>
      <Typography
        className={cnNotFoundLabel(undefined, [props.className])}
        size={'l'}
        weight={'semibold'}
        fullWidth
        align={'center'}
      >
        Ничего не найдено
      </Typography>
    </Box>
  );
};
