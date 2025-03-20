import { cn } from '@bem-react/classname';
import { Page, Typography, VStack } from '@shared/elements/ui';
import { useGlobalStore } from '@shared/stores';
import { Quotes } from '@widgets/Quotes';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { UserContent } from '../components/UserContent';

const cnHomePage = cn('HomePage');

interface HomePageProps {
  className?: string;
}

export const HomePage: FC<HomePageProps> = observer((props) => {
  const { userService } = useGlobalStore();

  return (
    <Page className={cnHomePage(undefined, [props.className])}>
      <VStack as={'header'} gap={'32'} align={'center'}>
        <Typography weight={'bold'} size={'xl'} as={'h1'}>
          Word Flow — дневник автора
        </Typography>
        <Quotes />
      </VStack>
      {userService.isAuth && <UserContent />}
    </Page>
  );
});
