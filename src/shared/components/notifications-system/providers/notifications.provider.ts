import { useJoinNotificationsRoom } from '../hooks/use-join-notifications-room';
import { useNotificationsSocketListener } from '../hooks/use-notifications-socket-listener';

export const NotificationProvider = () => {
  useJoinNotificationsRoom();
  useNotificationsSocketListener();
  return null;
};
