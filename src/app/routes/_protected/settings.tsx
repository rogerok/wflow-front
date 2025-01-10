import { createFileRoute, redirect } from '@tanstack/react-router';
import { SettingsPage } from '@pages';
import { globalStore, routes } from '@shared';

export const Route = createFileRoute('/_protected/settings')({
  component: SettingsPage,
});
