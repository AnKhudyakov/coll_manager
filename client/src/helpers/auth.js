import Cookies from "js-cookie";

export const setToken = (data) => {
  if (typeof window === "undefined") {
    return;
  }
  Cookies.set("id", data.user._id, { sameSite: "strict", secure: true });
  Cookies.set("username", data.user.username, {
    sameSite: "strict",
    secure: true,
  });
  Cookies.set("jwt", data.accessToken, { sameSite: "strict", secure: true });
};

export const unsetToken = () => {
  if (typeof window === "undefined") {
    return;
  }
  Cookies.remove("id");
  Cookies.remove("jwt");
  Cookies.remove("username");
};

export const getUserId = () => {
  return Cookies.get("id");
};

export const getToken = () => {
  return Cookies.get("jwt");
};
