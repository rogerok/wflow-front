import { FC } from 'react';
import { cn } from '@bem-react/classname';
import { Input, Page, FormField, FormStore } from '@wflow-front/shared';
import { z } from 'zod';

const cnHomePage = cn('HomePage');

interface HomePageProps {
  className?: string;
}

const schema = z.object({
  name: z.string(),
  description: z.string(),
});

type Schem = z.infer<typeof schema>;

export const HomePage: FC<HomePageProps> = (props) => {
  const formConfig = new FormStore<Schem>({
    fields: {
      name: new FormField(''),
      description: new FormField('123'),
    },
    defaultValues: {
      name: '',
      description: '123',
    },
  });

  return (
    <Page className={cnHomePage(undefined, [props.className])}>
      <form>
        {/*<Input name={'firstField'} field={new FormField('')} />*/}
        {/*<Input field={new FormField('321')} />*/}
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
};
