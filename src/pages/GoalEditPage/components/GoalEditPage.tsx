import { cn } from '@bem-react/classname';
import { UiTextConstant } from '@shared/const';
import {
  DatePickerInput,
  FormComponent,
  FormTextArea,
  TextInput,
} from '@shared/elements/components';
import { Button, Loader, Page, PageSeo, VStack } from '@shared/elements/ui';
import { getRouteApi } from '@tanstack/react-router';
import { addDays, isBefore } from 'date-fns';
import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';

import { GoalEditService } from '../model/services/goalEditService';
import { GoalEditFormType } from '../model/types/goalEditTypes';

const cnGoalEditPage = cn('GoalEditPage');

interface GoalEditPageProps {
  className?: string;
}

const route = getRouteApi('/_protected/goals/edit/$goalId');

export const GoalEditPage: FC<GoalEditPageProps> = observer((props) => {
  const id = route.useParams().goalId;
  const [service] = useState(() => new GoalEditService(id));
  const fields = service.form.fields;

  useEffect(() => {
    service.init();
  }, [service]);

  return (
    <Page className={cnGoalEditPage(undefined, [props.className])}>
      <PageSeo title={service.goal?.title} />
      {service.isLoading ? (
        <Loader />
      ) : (
        service.goal && (
          <FormComponent<GoalEditFormType>
            onSubmit={service.submit}
            form={service.form}
          >
            <VStack gap={'16'} fullWidth>
              <TextInput
                field={fields.title}
                fullWidth
                label={'Название цели'}
              />
              <FormTextArea
                field={fields.description}
                fullWidth
                label={'Описание'}
              />
              <TextInput
                label={'Количество слов'}
                type={'number'}
                field={fields.goalWords}
                fullWidth
              />
              <DatePickerInput
                label={'Дата начала'}
                field={fields.startDate}
                showMonthDropdown
                showYearDropdown
                minDate={new Date()}
                disabled={isBefore(service.goal.startDate, new Date())}
                fullWidth
              />
              <DatePickerInput
                label={'Дата завершения'}
                field={fields.endDate}
                minDate={addDays(new Date(service.goal.startDate), 1)}
                showMonthDropdown
                showYearDropdown
                fullWidth
              />
              <Button type={'submit'} disabled={service.form.isSubmitting}>
                {UiTextConstant.post()}
              </Button>
            </VStack>
          </FormComponent>
        )
      )}
    </Page>
  );
});
