import { cn } from '@bem-react/classname';
import { routes } from '@shared/const';
import { ButtonLink, Page, VStack } from '@shared/elements';
import { BooksService } from '@shared/services';
import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';

const cnBooksPage = cn('BooksPage');

interface BooksPageProps {
  className?: string;
}

export const BooksPage: FC<BooksPageProps> = observer((props) => {
  const [service] = useState(() => new BooksService());

  useEffect(() => {
    service.list();

    return () => {
      service.abortRequest();
    };
  }, [service]);

  return (
    <Page className={cnBooksPage(undefined, [props.className])}>
      <ButtonLink to={routes.booksCreate()}>Добавить</ButtonLink>

      <VStack as={'ul'} gap={'16'} fullWidth>
        {service.data.map((book) => (
          <VStack gap={'8'} as={'li'}>
            <h3 key={book.id}>{book.name}</h3>
            <p key={book.id}>{book.description}</p>
            <p key={book.id}>
              Создано {new Date(book.createdAt).toLocaleDateString()}
            </p>
          </VStack>
        ))}
      </VStack>
    </Page>
  );
});
