import { createFileRoute } from '@tanstack/react-router';
import { SettingsPage } from '@wflow-front/pages';

export const Route = createFileRoute('/settings')({
  component: SettingsPage,
});
