import { cn } from '@bem-react/classname';
import { Autocomplete } from '@shared/elements/components';
import { Page } from '@shared/elements/ui';
import { FormStore } from '@shared/lib';
import { observer } from 'mobx-react-lite';
import { FC, useState } from 'react';
import { z } from 'zod';

const cnHomePage = cn('HomePage');

interface HomePageProps {
  className?: string;
}

type Options = {
  id: string;
  label: string;
  otherLabel: string;
};

const options: Options[] = [
  { id: '1', label: 'Label 1', otherLabel: ' other Label 1' },
  { id: '2', label: 'Label 2', otherLabel: ' other Label 2' },
  {
    id: '3',
    label: 'Label 3',
    otherLabel: ' other Label 3',
  },
  { id: '4', label: 'Label 4', otherLabel: ' other Label 4' },
  { id: '5', label: 'Label 5', otherLabel: ' other Label 5' },
];

export const HomePage: FC<HomePageProps> = observer((props) => {
  const [form] = useState(
    () =>
      new FormStore({
        defaultValues: {
          name: '',
        },
        schema: z.object({
          name: z.string(),
        }),
      }),
  );

  return (
    <Page className={cnHomePage(undefined, [props.className])}>
      home page
      <Autocomplete<Options>
        options={options}
        field={form.fields.name}
        labelField={'label'}
        uniqueIdentifier={'id'}
      />
    </Page>
  );
});
