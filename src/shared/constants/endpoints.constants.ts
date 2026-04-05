export const ENDPOINTS = {
  ADMIN: {
    GET_USER: (query: string) => `admin/get-user?search-query=${query}`,
    CHANGE_USER_ROLE: "admin/change-user-role",
    LOCK_USER: (userEmail: string) => `admin/lock-user/byEmail/${userEmail}`
  },
  MODERATOR: {
    PROPERTIES_TO_CHECK: "moderator/properties-to-check",
    SUBMIT_APPROVAL: (approves: boolean, pId: string) =>
      `property/${approves ? "approve" : "deny"}/${pId}`
  },
  AUTH: {
    LOGIN: "auth/login",
    REGISTER: "auth/register",
    LOGOUT: "auth/logout",
    USER_GOOGLE_LOGIN: "auth/google",
    REFRESH_TOKEN: "auth/refresh-token"
  },
  NOTIFICATIONS: {
    GET_CONVERSATIONS_BY_PROPERTY_ID: (page: number) =>
      `node/notifications/user-notifications?page=${page}`,
    MARK_NOTIFICATIONS_AS_READ: "node/notifications/mark-notifications-as-read",
    GET_UNREAD_NOTIFICATIONS: "node/notifications/unread-notifications"
  },
  PROPERTY: {
    CREATE_PROPERTY: "property/post",
    UPDATE_PROPERTY: "property/update",
    DRAW_TO_SEARCH: (authenticated: boolean) =>
      authenticated
        ? "property/protected/draw-to-search"
        : "property/draw-to-search",
    PREVIEWS: (authenticated: boolean, page: number) =>
      `${authenticated ? "property/protected/draw-to-search/previews" : "property/draw-to-search/previews"}?page=${page}`,
    PROPERTIES_BY_USER: "property/byuser",
    TOGGLE_FAVORITE: (propertyId: string) =>
      `property/add-to-favorites/${propertyId}`,
    GET_PROPERTY_BY_ID: (propertyId: string, authenticated = false) =>
      authenticated
        ? `property/protected/byId/${propertyId}`
        : `property/byId/${propertyId}`,
    SEARCH_BY_LIST: (authenticated: boolean, page: number) =>
      `${authenticated ? "property/protected/search-by-list" : "property/search-by-list"}?page=${page}`
  },
  MESSAGE: {
    SEND_MESSAGE: "node/message/send-message",
    GET_UNREAD_MESSAGES_COUNT: "node/message/get-unread-messages-count",
    GET_CONVERSATION_META: ({
      propertyId,
      userId
    }: {
      propertyId: string;
      userId: string;
    }) => `node/message/get-conversation-meta/${propertyId}/${userId}`,
    CONVERSATIONS_PREVIEWS: (page: number) =>
      `node/message/conversations-previews?page=${page}`,
    GET_CONVERSATIONS_BY_PROPERTY_ID: (
      propertyId: string,
      recipientId: string,
      page: number
    ) => `node/message/get-messages/${propertyId}/${recipientId}?page=${page}`,
    MARK_CONVERSATION_AS_READ: ({
      propertyId,
      senderId
    }: {
      propertyId: string;
      senderId: string;
    }) => `node/message/mark-conversation-as-read/${propertyId}/${senderId}`,
    RESPOND_TO_VIEWING_REQUEST: ({
      accepts,
      messageId
    }: {
      accepts: boolean;
      messageId: string;
    }) =>
      `node/message/respond-to-viewing-request?accepts=${accepts}&messageId=${messageId}`
  },
  USER: {
    ADD_REGION_TO_FAVORITE: "users/add-region-to-favorite"
  },
  SERVICES: {
    PRESIGNED_URL: "services/upload/presigned-url"
  },
  CLOUDINARY: {
    UPLOAD_IMAGE: (cloud_name: string) =>
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`
  },
  SOCKET: {
    NEW_CHAT_MESSAGE: (propertyId: string) => `messages:${propertyId}`
  }
};
