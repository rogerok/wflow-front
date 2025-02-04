import { cn } from '@bem-react/classname';
import { Page } from '@shared/elements/ui';
import { GoalsService } from '@shared/services';
import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';

const cnGoalsPage = cn('GoalsPage');

interface GoalsPageProps {
  className?: string;
}

export const GoalsPage: FC<GoalsPageProps> = observer((props) => {
  const [service] = useState(() => new GoalsService());

  useEffect(() => {
    service.list();

    return () => {
      service.abortRequest();
    };
  }, [service]);

  return (
    // <Page className={cnGoalsPage(undefined, [props.className])}>
    //   {service.goalsListRequest.isLoading ? (
    //     <div style={{ width: '300px', background: 'red' }}>loading...</div>
    //   ) : (
    //     service.data.map((goal) => (
    //       <VStack key={goal.id}>
    //         <p>{goal.createdAt}</p>
    //         <p>{goal.description}</p>
    //       </VStack>
    //     ))
    //   )}
    // </Page>

    <Page className={cnGoalsPage(undefined, [props.className])}>
      {service.goalsListRequest.isLoading && (
        <div style={{ width: '300px', background: 'red' }}>loading...</div>
      )}
    </Page>
  );
});
