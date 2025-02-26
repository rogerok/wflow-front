// import { cn } from '@bem-react/classname';
// import { ReportCreateService } from '@shared/services';
// import { ReportCreateForm } from '@widgets/ReportCreateForm';
// import { ReportCreateFormDefaultValues } from '@widgets/ReportCreateForm/model/constants/constants';
// import { observer } from 'mobx-react-lite';
// import { FC, useState } from 'react';
//
// const cnBookCreateReportForm = cn('BookCreateReportForm');
//
// interface BookCreateReportFormProps {
//   className?: string;
// }
//
// export const BookCreateReportForm: FC<BookCreateReportFormProps> = observer(
//   (props) => {
//     const { bookId, className } = props;
//
//     const [service] = useState(
//       () =>
//         new ReportCreateService({
//           ...ReportCreateFormDefaultValues,
//           bookId: bookId,
//         }),
//     );
//
//     return (
//       <ReportCreateForm
//         className={cnBookCreateReportForm(undefined, [className])}
//         bookId={bookId}
//         service={service}
//       />
//     );
//   },
// );
