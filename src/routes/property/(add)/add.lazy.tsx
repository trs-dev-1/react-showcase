import { CreateUpdateProperty } from '@/domains/property';
import { Container } from '@/shared/components/ui/container';
import {
  createLazyFileRoute,
  HeadContent,
  useSearch
} from '@tanstack/react-router';

export const Route = createLazyFileRoute('/property/(add)/add')({
  component: RouteComponent
});

function RouteComponent() {
  const { pId } = useSearch({ from: '/property/(add)/add' });

  return (
    <Container>
      <HeadContent />

      <CreateUpdateProperty pId={pId || ''} />
    </Container>
  );
}
