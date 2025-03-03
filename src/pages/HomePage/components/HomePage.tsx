import { cn } from '@bem-react/classname';
import { Page, Typography } from '@shared/elements/ui';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

const cnHomePage = cn('HomePage');

interface HomePageProps {
  className?: string;
}

export const HomePage: FC<HomePageProps> = observer((props) => {
  return (
    <Page className={cnHomePage(undefined, [props.className])}>
      <Typography
        weight={'bold'}
        size={'xl'}
        align={'center'}
        fullWidth
        as={'h1'}
      >
        Word Flow — дневник автора
      </Typography>
    </Page>
  );
});
