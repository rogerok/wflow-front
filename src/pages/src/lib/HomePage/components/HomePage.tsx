import { FC, FormEvent } from 'react';
import { cn } from '@bem-react/classname';
import { Button, FormStore, Page, TextField } from '@wflow-front/shared';
import { z } from 'zod';
import { observer } from 'mobx-react-lite';

const cnHomePage = cn('HomePage');

interface HomePageProps {
  className?: string;
}

const schema = z.object({
  name: z.string().min(10),
  description: z.string().min(10),
});

type Schem = z.infer<typeof schema>;

export const HomePage: FC<HomePageProps> = observer((props) => {
  const formConfig = new FormStore<Schem>({
    schema: schema,
    defaultValues: {
      name: '',
      description: '123',
    },
    handleSubmit: async (values: Schem): Promise<void> => {
      console.log(values);
    },
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await formConfig.submit();
    console.log(formConfig.isSubmitting);
  };

  console.log(formConfig.isSubmitting);

  return (
    <Page className={cnHomePage(undefined, [props.className])}>
      <form onSubmit={handleSubmit}>
        <TextField name={'firstField'} field={formConfig.fields.name} />
        <TextField field={formConfig.fields.description} />
        <Button type={'submit'}>Submit</Button>
        <div>
          {formConfig.errors.errorList?.map((err) => 'i error' + err.error)}
        </div>
      </form>

      <div
        style={{
          height: '100px',
          background: 'lightblue',
          marginBottom: '2rem',
        }}
      >
        dasdasd
      </div>
      <div
        style={{
          height: '100px',
          background: 'lightblue',
          marginBottom: '2rem',
        }}
      >
        dasdasd
      </div>
      <div
        style={{
          height: '100px',
          background: 'lightblue',
          marginBottom: '2rem',
        }}
      >
        dasdasd
      </div>
      <div
        style={{
          height: '100px',
          background: 'lightblue',
          marginBottom: '2rem',
        }}
      >
        dasdasd
      </div>
      <div
        style={{
          height: '100px',
          background: 'lightblue',
          marginBottom: '2rem',
        }}
      >
        dasdasd
      </div>
      <div
        style={{
          height: '100px',
          background: 'lightblue',
          marginBottom: '2rem',
        }}
      >
        dasdasd
      </div>
      <div
        style={{
          height: '100px',
          background: 'lightblue',
          marginBottom: '2rem',
        }}
      >
        dasdasd
      </div>
      <div
        style={{
          height: '100px',
          background: 'lightblue',
          marginBottom: '2rem',
        }}
      >
        dasdasd
      </div>
      <div
        style={{
          height: '100px',
          background: 'lightblue',
          marginBottom: '2rem',
        }}
      >
        dasdasd
      </div>
      <div
        style={{
          height: '100px',
          background: 'lightblue',
          marginBottom: '2rem',
        }}
      >
        dasdasd
      </div>
      <div
        style={{
          height: '100px',
          background: 'lightblue',
          marginBottom: '2rem',
        }}
      >
        dasdasd
      </div>
      <div
        style={{
          height: '100px',
          background: 'lightblue',
          marginBottom: '2rem',
        }}
      >
        dasdasd
      </div>
      <div
        style={{
          height: '100px',
          background: 'lightblue',
          marginBottom: '2rem',
        }}
      >
        dasdasd
      </div>
      <div
        style={{
          height: '100px',
          background: 'lightblue',
          marginBottom: '2rem',
        }}
      >
        dasdasd
      </div>
      <div
        style={{
          height: '100px',
          background: 'lightblue',
          marginBottom: '2rem',
        }}
      >
        dasdasd
      </div>
      <div
        style={{
          height: '100px',
          background: 'lightblue',
          marginBottom: '2rem',
        }}
      >
        dasdasd
      </div>
      <div
        style={{
          height: '100px',
          background: 'lightblue',
          marginBottom: '2rem',
        }}
      >
        dasdasd
      </div>
      <div
        style={{
          height: '100px',
          background: 'lightblue',
          marginBottom: '2rem',
        }}
      >
        dasdasd
      </div>
      <div
        style={{
          height: '100px',
          background: 'lightblue',
          marginBottom: '2rem',
        }}
      >
        dasdasd
      </div>
      <div
        style={{
          height: '100px',
          background: 'lightblue',
          marginBottom: '2rem',
        }}
      >
        dasdasd
      </div>
      <div
        style={{
          height: '100px',
          background: 'lightblue',
          marginBottom: '2rem',
        }}
      >
        dasdasd
      </div>
      <div
        style={{
          height: '100px',
          background: 'lightblue',
          marginBottom: '2rem',
        }}
      >
        dasdasd
      </div>
      <div
        style={{
          height: '100px',
          background: 'lightblue',
          marginBottom: '2rem',
        }}
      >
        dasdasd
      </div>
      <div
        style={{
          height: '100px',
          background: 'lightblue',
          marginBottom: '2rem',
        }}
      >
        dasdasd
      </div>
      <div
        style={{
          height: '100px',
          background: 'lightblue',
          marginBottom: '2rem',
        }}
      >
        dasdasd
      </div>
      <div
        style={{
          height: '100px',
          background: 'lightblue',
          marginBottom: '2rem',
        }}
      >
        dasdasd
      </div>
      <div
        style={{
          height: '100px',
          background: 'lightblue',
          marginBottom: '2rem',
        }}
      >
        dasdasd
      </div>
      <div
        style={{
          height: '100px',
          background: 'lightblue',
          marginBottom: '2rem',
        }}
      >
        dasdasd
      </div>
      <div
        style={{
          height: '100px',
          background: 'lightblue',
          marginBottom: '2rem',
        }}
      >
        dasdasd
      </div>
      <div
        style={{
          height: '100px',
          background: 'lightblue',
          marginBottom: '2rem',
        }}
      >
        dasdasd
      </div>
      <div
        style={{
          height: '100px',
          background: 'lightblue',
          marginBottom: '2rem',
        }}
      >
        dasdasd
      </div>
      <div
        style={{
          height: '100px',
          background: 'lightblue',
          marginBottom: '2rem',
        }}
      >
        dasdasd
      </div>
      <div
        style={{
          height: '100px',
          background: 'lightblue',
          marginBottom: '2rem',
        }}
      >
        dasdasd
      </div>
      <div
        style={{
          height: '100px',
          background: 'lightblue',
          marginBottom: '2rem',
        }}
      >
        dasdasd
      </div>
      <div
        style={{
          height: '100px',
          background: 'lightblue',
          marginBottom: '2rem',
        }}
      >
        dasdasd
      </div>
      <div
        style={{
          height: '100px',
          background: 'lightblue',
          marginBottom: '2rem',
        }}
      >
        dasdasd
      </div>
      <div
        style={{
          height: '100px',
          background: 'lightblue',
          marginBottom: '2rem',
        }}
      >
        dasdasd
      </div>
      <div
        style={{
          height: '100px',
          background: 'lightblue',
          marginBottom: '2rem',
        }}
      >
        dasdasd
      </div>
      <div
        style={{
          height: '100px',
          background: 'lightblue',
          marginBottom: '2rem',
        }}
      >
        dasdasd
      </div>
      <div
        style={{
          height: '100px',
          background: 'lightblue',
          marginBottom: '2rem',
        }}
      >
        dasdasd
      </div>
      <div
        style={{
          height: '100px',
          background: 'lightblue',
          marginBottom: '2rem',
        }}
      >
        dasdasd
      </div>
      <div
        style={{
          height: '100px',
          background: 'lightblue',
          marginBottom: '2rem',
        }}
      >
        dasdasd
      </div>
      <div
        style={{
          height: '100px',
          background: 'lightblue',
          marginBottom: '2rem',
        }}
      >
        dasdasd
      </div>
      <div
        style={{
          height: '100px',
          background: 'lightblue',
          marginBottom: '2rem',
        }}
      >
        dasdasd
      </div>
      <div
        style={{
          height: '100px',
          background: 'lightblue',
          marginBottom: '2rem',
        }}
      >
        dasdasd
      </div>
      <div
        style={{
          height: '100px',
          background: 'lightblue',
          marginBottom: '2rem',
        }}
      >
        dasdasd
      </div>
      <div
        style={{
          height: '100px',
          background: 'lightblue',
          marginBottom: '2rem',
        }}
      >
        dasdasd
      </div>
      <div
        style={{
          height: '100px',
          background: 'lightblue',
          marginBottom: '2rem',
        }}
      >
        dasdasd
      </div>
      <div
        style={{
          height: '100px',
          background: 'lightblue',
          marginBottom: '2rem',
        }}
      >
        dasdasd
      </div>
      <div
        style={{
          height: '100px',
          background: 'lightblue',
          marginBottom: '2rem',
        }}
      >
        dasdasd
      </div>
      <div
        style={{
          height: '100px',
          background: 'lightblue',
          marginBottom: '2rem',
        }}
      >
        dasdasd
      </div>
      <div
        style={{
          height: '100px',
          background: 'lightblue',
          marginBottom: '2rem',
        }}
      >
        dasdasd
      </div>
    </Page>
  );
});
