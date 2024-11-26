import { TUser } from "@/types";
import { formatError } from "@/lib/utils";
import { axiosClient } from "@/lib/api";

export const getUser = async () => {
  const { data } = await axiosClient.get("/users/user-details");
  return data.user as TUser;
};

export const updateUser = async (body: any) => {
  try {
    const { data } = await axiosClient.put("/users/update-user-details", body);
    return data;
  } catch (error: any) {
    return { error: formatError(error) };
  }
};
