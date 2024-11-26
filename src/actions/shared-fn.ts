"use server";

import { createAxiosClient } from "@/lib/api";
import { cookies, headers } from "next/headers";

export const getServerClient = async () => {
  const cookieStore = cookies();
  const headersList = headers();

  const cookiesToSend = {
    jwt: cookieStore.get("jwt"),
    session: cookieStore.get("session"),
    "session.sig": cookieStore.get("session.sig"),
  };

  const filteredCookies = Object.entries(cookiesToSend)
    .filter(([, cookie]) => cookie)
    .map(([name, cookie]) => `${name}=${cookie?.value}`)
    .join("; ");

  const availableHeaders = {
    Cookie: filteredCookies,
    ...Object.fromEntries(
      Array.from(headersList.entries()).filter(
        ([key]) => key.toLowerCase() !== "cookie"
      )
    ),
  };
  return createAxiosClient(availableHeaders);
};
