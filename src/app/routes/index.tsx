import { createFileRoute } from '@tanstack/react-router';
import { HomePage } from '@wflow-front/pages';

export const Route = createFileRoute('/')({
  component: HomePage,
});
