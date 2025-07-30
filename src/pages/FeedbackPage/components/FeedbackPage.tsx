import { cn } from '@bem-react/classname';
import { Page, Typography } from '@shared/elements/ui';
import { FC } from 'react';

const cnFeedbackPage = cn('FeedbackPage');

interface FeedbackPageProps {
  className?: string;
}

export const FeedbackPage: FC<FeedbackPageProps> = (props) => {
  return (
    <Page className={cnFeedbackPage(undefined, [props.className])}>
      <Typography size={'xl'} align={'center'} as={'h2'} fullWidth>
        Нашли проблемы, есть пожелания по функционалу или работе сайта?
        <br />
        Буду рад Вашей обратной связи. Связаться со мной в{' '}
        <a
          href={'https://t.me/slaavikkk'}
          target="_blank"
          rel="noopener noreferrer"
        >
          Telegram
        </a>
      </Typography>
    </Page>
  );
};
