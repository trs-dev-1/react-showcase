import { UserPropertiesGrid } from '@/domains/user';
import { ErrorBoundary } from '@/shared/components/error-boundary/error-boundary';
import { Container } from '@/shared/components/ui/container';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

export const Route = createLazyFileRoute('/user/(properties)/properties')({
  component: RouteComponent
});

function RouteComponent() {
  const [t] = useTranslation();
  return (
    <Container className="h-full">
      <h1 className="my-2 text-lg">{t('your-properties')}</h1>
      <ErrorBoundary>
        <UserPropertiesGrid />
      </ErrorBoundary>
    </Container>
  );
}
