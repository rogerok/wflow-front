import { cn } from '@bem-react/classname';
import { getQuote } from '@shared/api';
import { Typography } from '@shared/elements/ui';
import { RequestStore } from '@shared/stores';
import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';

const cnQuotes = cn('Quotes');

interface QuotesProps {
  className?: string;
}

export const Quotes: FC<QuotesProps> = observer((props) => {
  const [request] = useState(() => new RequestStore(getQuote));

  useEffect(() => {
    request.call();
  }, [request]);

  return (
    request.result.status === 'success' && (
      <Typography as={'p'} className={cnQuotes(undefined, [props.className])}>
        {request.result.data?.text}
      </Typography>
    )
  );
});
