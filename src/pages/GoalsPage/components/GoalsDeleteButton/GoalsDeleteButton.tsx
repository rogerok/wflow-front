import { cn } from '@bem-react/classname';
import { UiTextConstant } from '@shared/const';
import {
  Box,
  Button,
  HStack,
  IconComponent,
  Modal,
  Typography,
  VStack,
} from '@shared/elements/ui';
import { useOpenClose } from '@shared/lib/hooks/useOpenClose';
import { useGlobalStore } from '@shared/stores';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { useGoalsContext } from '../../model/hooks/useGoalsContext';

const cnGoalsDeleteButton = cn('GoalsDeleteButton');

interface GoalsDeleteButtonProps {
  className?: string;
  goalId: string;
  goalTitle: string;
}

export const GoalsDeleteButton: FC<GoalsDeleteButtonProps> = observer(
  (props) => {
    const facade = useGoalsContext();
    const { open, handleOpen, handleClose } = useOpenClose();
    const { goalId, goalTitle } = props;
    const { screen } = useGlobalStore();

    return (
      <Box
        ml={'auto'}
        className={cnGoalsDeleteButton(undefined, [props.className])}
      >
        <Button
          variant={'warn'}
          onClick={handleOpen}
          addonRight={<IconComponent name={'BinIcon'} size={'sm'} />}
        >
          Удалить
        </Button>
        <Modal
          fullScreen={screen.downMd}
          onClose={handleClose}
          open={open}
          title={UiTextConstant.delete(`цель ${goalTitle}`)}
        >
          <VStack gap={'64'} fullHeight>
            <VStack as={'p'} gap={'16'} flexJustify={'center'}>
              <Typography
                variant={'warn'}
                size={'l'}
                weight={'bold'}
                align={'center'}
              >
                Внимание!
              </Typography>
              <Typography variant={'warn'} weight={'bold'} align={'center'}>
                При удалении цели так же будут удалены все отчёты, статистика
                этой цели.
              </Typography>
            </VStack>

            <HStack flexJustify={'between'} gap={'64'} mt={'auto'}>
              <Button
                fullWidth={screen.downMd}
                variant={'warn'}
                disabled={facade.isLoading}
                onClick={() => facade.deleteGoal(goalId)}
                addonRight={<IconComponent name={'BinIcon'} size={'sm'} />}
              >
                {UiTextConstant.delete('цель')}
              </Button>
              <Button
                fullWidth={screen.downMd}
                disabled={facade.isLoading || facade.isDeleting}
                onClick={handleClose}
              >
                {UiTextConstant.cancel()}
              </Button>
            </HStack>
          </VStack>
        </Modal>
      </Box>
    );
  },
);
