export const NOTIFICATIONS_PREDICATE = "[NOTIFICATIONS]";

export const NotificationsQueryKeys = {
  LIST: () => [NOTIFICATIONS_PREDICATE, "User notifications"],
  COUNT: () => [NOTIFICATIONS_PREDICATE, "User notifications count"]
};
