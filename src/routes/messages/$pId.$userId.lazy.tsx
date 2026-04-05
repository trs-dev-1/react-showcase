import { ChatItem } from '@/domains/messages';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/messages/$pId/$userId')({
  component: ChatItem
});
