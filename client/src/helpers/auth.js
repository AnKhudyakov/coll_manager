export const setToken = (data) => {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem("user", JSON.stringify(data.user));
  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);
};

export const unsetToken = () => {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.removeItem("user");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

export const getUserId = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user._id;
};

export const getToken = () => {
  return localStorage.getItem("accessToken");
};

export const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
