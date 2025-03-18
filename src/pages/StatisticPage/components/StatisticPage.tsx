import { cn } from '@bem-react/classname';
import { Loader, Page, PageSeo, VStack } from '@shared/elements/ui';
import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';

import { StatisticContext } from '../model/context/StatisticContext';
import { StatisticService } from '../model/services/StatisticService';
import { StatisticCombined } from './StatisticCombined';
import { StatisticCumulativeProgress } from './StatisticCumulativeProgress';
import { StatisticGoalCompletion } from './StatisticGoalCompletion';

const cnStatisticPage = cn('StatisticPage');

interface StatisticPageProps {
  className?: string;
}

export const StatisticPage: FC<StatisticPageProps> = observer((props) => {
  const [service] = useState(() => new StatisticService());

  useEffect(() => {
    service.fetch();

    return () => {
      service.abortRequest();
    };
  }, [service]);

  return (
    <StatisticContext value={service}>
      <Page className={cnStatisticPage(undefined, [props.className])}>
        <PageSeo title={'Статистика автора'} />
        {service.isLoading ? (
          <Loader />
        ) : (
          <VStack as={'section'} gap={'64'}>
            <StatisticCumulativeProgress />
            <StatisticGoalCompletion />
            <StatisticCombined />
          </VStack>
        )}
      </Page>
    </StatisticContext>
  );
});
