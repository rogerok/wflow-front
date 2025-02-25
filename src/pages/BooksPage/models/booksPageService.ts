import { BooksService, ReportCreateService } from '@shared/services';
import { makeAutoObservable } from 'mobx';

type BooksPageServiceArgs = {
  reportCreateService: ReportCreateService;
  booksListService: BooksService;
};

export class BooksPageService {
  books: BooksService;
  reportCreate: ReportCreateService;

  constructor(args: BooksPageServiceArgs) {
    this.books = args.booksListService;
    this.reportCreate = args.reportCreateService;
    makeAutoObservable(
      this,
      {},
      {
        autoBind: true,
      },
    );
  }

  loadBooksList = async (): Promise<void> => {
    await this.books.list();
  };

  submitForm = async (): Promise<void> => {
    await this.reportCreate.submit();
  };
}
