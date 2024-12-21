import { FC, FormEvent } from 'react';
import { cn } from '@bem-react/classname';
import { Button, FormStore, Input, Page } from '@wflow-front/shared';
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
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    formConfig.validate();
    console.log(formConfig.values);
  };

  console.log(formConfig.validator.errors);

  return (
    <Page className={cnHomePage(undefined, [props.className])}>
      <form onSubmit={handleSubmit}>
        <Input name={'firstField'} field={formConfig.fields.name} />
        <Input field={formConfig.fields.description} />
        <Button type={'submit'}>Submit</Button>
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
