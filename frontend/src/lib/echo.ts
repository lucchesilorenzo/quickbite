import { configureEcho } from "@laravel/echo-react";
import axios from "axios";
import { Channel, ChannelAuthorizationCallback } from "pusher-js";

import env from "./env";

configureEcho({
  broadcaster: "reverb",
  key: env.VITE_REVERB_APP_KEY,
  wsHost: env.VITE_REVERB_HOST,
  wsPort: env.VITE_REVERB_PORT,
  wssPort: env.VITE_REVERB_PORT,
  forceTLS: (env.VITE_REVERB_SCHEME ?? "https") === "https",
  enabledTransports: ["ws", "wss"],
  authorizer: (channel: Channel) => {
    return {
      authorize: (socketId: string, callback: ChannelAuthorizationCallback) => {
        axios
          .post(
            `${env.VITE_BASE_URL}/api/broadcasting/auth`,
            {
              socket_id: socketId,
              channel_name: channel.name,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            },
          )
          .then((response) => callback(null, response.data))
          .catch((error: Error) => callback(error, null));
      },
    };
  },
});
