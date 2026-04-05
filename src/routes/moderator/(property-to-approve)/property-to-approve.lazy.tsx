import { PropertiesToApproveView } from '@/domains/moderator';
import { Container } from '@/shared/components/ui/container';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute(
  '/moderator/(property-to-approve)/property-to-approve'
)({
  component: RouteComponent
});

function RouteComponent() {
  return (
    <Container className="h-full">
      <PropertiesToApproveView />
    </Container>
  );
}
