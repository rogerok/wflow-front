import { FC } from 'react';
import { cn } from '@bem-react/classname';
import { Input, Page, FormField, FormStore } from '@wflow-front/shared';
import { z } from 'zod';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';

const cnHomePage = cn('HomePage');

interface HomePageProps {
  className?: string;
}

const schema = z.object({
  name: z.string(),
  description: z.string(),
});

type Schem = z.infer<typeof schema>;

const formConfig = new FormStore<Schem>({
  schema: schema,
  defaultValues: {
    name: '',
    description: '123',
  },
});

export const HomePage: FC<HomePageProps> = observer((props) => {
  console.log(toJS(formConfig));

  return (
    <Page className={cnHomePage(undefined, [props.className])}>
      <form>
        {/*<Input name={'firstField'} field={new FormField('')} />*/}
        <Input field={formConfig.fields.name} />
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
