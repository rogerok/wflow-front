import { cn } from '@bem-react/classname';
import {
  ButtonLink,
  Page,
  PageTitle,
  Typography,
  VStack,
} from '@shared/elements/ui';
import { FC } from 'react';

const cnNotFoundPage = cn('NotFoundPage');

interface NotFoundPageProps {
  className?: string;
}

export const NotFoundPage: FC<NotFoundPageProps> = (props) => {
  return (
    <Page className={cnNotFoundPage(undefined, [props.className])}>
      <PageTitle title={'Страница не найдена'} />
      <VStack as={'p'} flexJustify={'center'} align={'center'} gap={'64'}>
        <Typography as={'h1'} size={'xl'} align={'center'}>
          Страница не найдена
        </Typography>
        <ButtonLink to={'/'}>На главную</ButtonLink>
      </VStack>
    </Page>
  );
};
