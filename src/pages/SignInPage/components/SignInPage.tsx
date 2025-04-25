import { cn } from '@bem-react/classname';
import { FormComponent, TextInput } from '@shared/elements/components';
import { Button, Page, Paper, Typography, VStack } from '@shared/elements/ui';
import { FormStore } from '@shared/lib';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { z } from 'zod';

const cnSignInPage = cn('SignInPage');

interface SignInPageProps {
  className?: string;
}

const arObj = z.object({
  first: z.string().min(10),
  second: z.boolean(),
  third: z.number(),
});

const schema = z.object({
  arr: z.array(arObj),
});

type type = z.infer<typeof schema>;

const form = new FormStore<type>({
  defaultValues: {
    arr: [
      {
        first: 'some',
        second: true,
        third: 1,
      },
    ],
  },
  schema: schema,
});

export const SignInPage: FC<SignInPageProps> = observer((props) => {
  return (
    <Page className={cnSignInPage(undefined, [props.className])}>
      <VStack as={'section'} gap={'32'}>
        <Typography
          as={'h1'}
          size={'xl'}
          fullWidth
          align={'center'}
          className={cnSignInPage('Title')}
        >
          Авторизация
        </Typography>
        {/*<SignInForm />*/}
        <Paper elevation={3} rounded={3} py={'32'} px={'16'} fullWidth>
          <FormComponent<type>
            onSubmit={async () => form.submit((values) => console.log(values))}
            form={form}
          >
            <VStack gap={'16'} flexJustify={'center'} align={'center'}>
              {form.fields.arr.fields.map((field) => (
                <TextInput field={field.fields.first} />
              ))}
            </VStack>
            <Button type={'submit'}>Войти</Button>
            <Button
              onClick={() =>
                form.fields.arr.push({
                  first: '123',
                  second: true,
                  third: 1,
                })
              }
            >
              push
            </Button>
          </FormComponent>
        </Paper>
      </VStack>
    </Page>
  );
});
