import { ConversationPreviewsContainer } from '@/domains/messages';
import { Container } from '@/shared/components/ui/container';
import {
  createLazyFileRoute,
  Outlet,
  useMatches
} from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { TbMessageCircleQuestion } from 'react-icons/tb';

export const Route = createLazyFileRoute('/messages')({
  component: RouteComponent
});

function RouteComponent() {
  const [t] = useTranslation();
  const hasActiveChild = useMatches().length > 2;

  return (
    <Container className="flex h-full">
      <ConversationPreviewsContainer />
      <div className="border-border ml-4 hidden h-full border-l sm:block"></div>
      <Outlet />
      {!hasActiveChild && (
        <div className="hidden size-full sm:block">
          <div className="flex size-full flex-col items-center justify-center">
            <TbMessageCircleQuestion className="size-11" />
            <h1>{t('please-select-a-conversation')}</h1>
          </div>
        </div>
      )}
    </Container>
  );
}
