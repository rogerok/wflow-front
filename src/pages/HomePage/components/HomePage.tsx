import { cn } from '@bem-react/classname';
import { Button, FormStore, Page } from '@shared';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { FC, FormEvent, useState } from 'react';
import { z } from 'zod';

const cnHomePage = cn('HomePage');

interface HomePageProps {
  className?: string;
}

const schema = z.object({
  name: z.string().min(10),
  description: z.string().min(10),
  // testArr: z.array(z.object({ name: z.string().min(10) })),
  testArr: z.array(z.object({ name: z.boolean() })),
  // testArr: z.array(z.object({ name: z.object({ name: z.string().min(10) }) })),
  bool: z.boolean(),
});

type Schem = z.infer<typeof schema>;

export const HomePage: FC<HomePageProps> = observer((props) => {
  const [form] = useState(
    () =>
      new FormStore<Schem>({
        schema: schema,
        defaultValues: {
          name: '',
          description: '123',
          bool: true,
          // testArr: [
          //   {
          //     name: {
          //       name: 'sdsd',
          //     },
          //   },
          // ],
          testArr: [
            {
              name: true,
            },
          ],
        },
      })
  );
  const handleSubmit2 = async (values: Schem): Promise<void> => {
    console.log(values);
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    await form.submit(handleSubmit2);
  };

  //FIXME: не подтягиваются типы поля (BooleanField)  у вложенных объектов
  console.log(form.fields.testArr.fields[0]);

  return (
    <Page className={cnHomePage(undefined, [props.className])}>
      <form onSubmit={handleSubmit}>
        {/*<TextField name={'firstField'} field={form.fields.name} />*/}
        {/*<TextField field={form.fields.description} />*/}
        <Button type={'submit'}>Submit</Button>
        <div>
          {Array.from(form.errors.errorMap?.values() ?? [])?.map(
            (err) => 'i error' + err
          )}
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
