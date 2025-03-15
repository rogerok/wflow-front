import { FC } from 'react';

interface PageSeoProps {
  title?: string;
  description?: string | null;
  type?: string;
}

export const PageSeo: FC<PageSeoProps> = (props) => {
  const { type = 'Дневник автора', title, description } = props;

  const t = `${title ? `${title} |` : ''} Word Flow - Дневник автора`;

  return (
    <>
      <title>{t}</title>
      <meta property="og:title" content={t} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Word Flow" />
    </>
  );
};
