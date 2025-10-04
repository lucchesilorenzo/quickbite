import { baseOffsetPaginationDefaults } from "./shared";

export const userNotificationsDefaults = {
  notifications: baseOffsetPaginationDefaults,
  unread_count: 0,
};

export const offersDefaults = baseOffsetPaginationDefaults;

export const reviewsDefaults = {
  reviews: baseOffsetPaginationDefaults,
  avg_rating: 0,
  count: 0,
};
