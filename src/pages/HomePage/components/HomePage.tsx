import { cn } from '@bem-react/classname';
import { Page, Typography, VStack } from '@shared/elements/ui';
import { Quotes } from '@widgets/Quotes';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { UserContent } from '../components/UserContent';

const cnHomePage = cn('HomePage');

interface HomePageProps {
  className?: string;
}

export const HomePage: FC<HomePageProps> = observer((props) => {
  return (
    <Page className={cnHomePage(undefined, [props.className])}>
      <VStack as={'header'} gap={'32'} align={'center'}>
        <Typography weight={'bold'} size={'xl'} as={'h1'}>
          Word Flow — дневник автора
        </Typography>
        <Quotes />
      </VStack>
      <UserContent />
    </Page>
  );
});
