import { SettingsPage } from '@/domains/settings';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/settings')({
  component: SettingsPage
});
