import Cookies from "js-cookie";

export const setToken = (data, navigate) => {
  if (typeof window === "undefined") {
    return;
  }
  Cookies.set("id", data.user.id, { sameSite: "strict", secure: true });
  Cookies.set("username", data.user.username, {
    sameSite: "strict",
    secure: true,
  });
  Cookies.set("jwt", data.token, { sameSite: "strict", secure: true });
  if (Cookies.get("username")) {
    setTimeout(() => {
      navigate("/");
    }, 1500);
  }
};

export const unsetToken = (navigate) => {
  if (typeof window === "undefined") {
    return;
  }
  Cookies.remove("id");
  Cookies.remove("jwt");
  Cookies.remove("username");
  navigate("/");
};
