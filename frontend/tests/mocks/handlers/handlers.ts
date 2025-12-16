import { authHandlers } from "./auth-handlers";
import { partnerHandlers } from "./partner-handlers";
import { publicHandlers } from "./public-handlers";

export const handlers = [
  ...publicHandlers,
  ...authHandlers,
  ...partnerHandlers,
];
