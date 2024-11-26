import { axiosClient } from "./api";

export const login = async (values: any) => {
  try {
    const response = await axiosClient.post("/auth/login", values);
    return response;
  } catch (error: any) {
    if (error.response && error.response.data?.errors) {
      const errorMessage =
        error.response.data.errors[0]?.message ||
        "An error occurred. Please try again.";
      return { error: errorMessage };
    }
  }
};

export const register = async (values: any) => {
  try {
    const response = await axiosClient.post("/auth/register", values);
    return response;
  } catch (error: any) {
    if (error.response && error.response.data?.errors) {
      const errorMessage =
        error.response.data.errors[0]?.message ||
        "An error occurred. Please try again.";
      return { error: errorMessage };
    } else if (error.request) {
      return { error: "No response from server. Please try again." };
    } else {
      return { error: error.message || "An unexpected error occurred." };
    }
  }
};

export const logout = async () => {
  try {
    const response = await axiosClient.post("/auth/signout");
    return response;
  } catch (error: any) {
    if (error.response && error.response.data?.errors) {
      const errorMessage =
        error.response.data.errors[0]?.message ||
        "An error occurred during logout.";
      throw new Error(errorMessage);
    }
    throw new Error(
      error.message || "An unexpected error occurred during logout."
    );
  }
};
