import { cn } from '@bem-react/classname';
import { ReportCreateService } from '@shared/services';
import { ReportCreateForm } from '@widgets/ReportCreateForm';
import { reportFormDefaultValues } from '@widgets/ReportCreateForm/model/constants/constants';
import { observer } from 'mobx-react-lite';
import { FC, useState } from 'react';

const cnBookCreateReportForm = cn('BookCreateReportForm');

interface BookCreateReportFormProps {
  className?: string;
  bookId: string;
}

export const BookCreateReportForm: FC<BookCreateReportFormProps> = observer(
  (props) => {
    const { bookId, className } = props;

    const [service] = useState(
      () =>
        new ReportCreateService({
          ...reportFormDefaultValues,
          bookId: bookId,
        }),
    );

    return (
      <ReportCreateForm
        bookId={bookId}
        service={service}
        className={cnBookCreateReportForm(undefined, [className])}
      />
    );
  },
);
