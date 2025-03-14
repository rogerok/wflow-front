import { cn } from '@bem-react/classname';
import { CssColorsVarsConstant } from '@shared/const';
import {
  HStack,
  Paper,
  RadialStatistic,
  Typography,
} from '@shared/elements/ui';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { useGoalService } from '../model/hooks/useGoalService';

const cnGoalStatistics = cn('GoalStatistics');

interface GoalStatisticsProps {
  className?: string;
}

export const GoalStatistics: FC<GoalStatisticsProps> = observer((props) => {
  const service = useGoalService();

  const statistics = service.statistics;
  const goal = service.goal;

  return (
    statistics &&
    goal && (
      <Paper
        elevation={3}
        rounded={3}
        px={'16'}
        py={'16'}
        className={cnGoalStatistics(undefined, [props.className])}
      >
        <HStack>
          <Typography>Всего написано слов</Typography>
          <RadialStatistic
            fill={CssColorsVarsConstant.BasicSecondary3}
            value={goal.writtenWords}
            domain={[0, goal.goalWords]}
          />
        </HStack>
        <HStack>
          <Typography>Среднее количество слов в день</Typography>
          <RadialStatistic
            fill={CssColorsVarsConstant.BasicSecondary3}
            value={statistics.averageWordsPerDay}
            domain={[0, goal.wordsPerDay]}
          />
        </HStack>
      </Paper>
    )
  );
});
