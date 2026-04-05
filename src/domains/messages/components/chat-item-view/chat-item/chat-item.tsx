import { useSocketStatus } from '@/shared/hooks/socket/use-socket-status';
import { getSocket } from '@/shared/services/socket.service';
import { useParams } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useMessagesStore } from '../../../hooks/use-messages-store';
import { MessageContainer } from '../message-container/message-container';

export const ChatItem = () => {
  const { pId, userId } = useParams({
    from: '/messages/$pId/$userId'
  });
  const isConnected = useSocketStatus();
  const { setMessageMeta } = useMessagesStore();

  useEffect(() => {
    return () => {
      setMessageMeta(null);
    };
  }, []);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    if (isConnected) {
      socket.emit('messages/connect-to-property-chat-message', {
        pId,
        userId
      });
    }
  }, [isConnected]);

  return <MessageContainer propertyId={pId} recipientId={userId!} />;
};
