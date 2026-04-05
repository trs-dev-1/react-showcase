import { AdminModalProvider, UserManagementView } from '@/domains/admin';
import { Container } from '@/shared/components/ui/container';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute(
  '/admin/(user-management)/user-management'
)({
  component: RouteComponent
});

function RouteComponent() {
  return (
    <Container className="h-full">
      <AdminModalProvider />
      <UserManagementView />
    </Container>
  );
}
