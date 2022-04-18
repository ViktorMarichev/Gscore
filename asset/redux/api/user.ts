import { apiInstance } from "./instance";
type UserParams = {
  email?: string;
  password?: string;
};
type UpdatePasswordParams = {
  currentPassword: string;
  newPassword: string;
  token: string;
};
type UpdatePersonalDataParams = {
  email: string;
  username: string;
  token: string;
};
export const User = {
  login: function (params: UserParams = {}) {
    const { email, password } = params;
    const api = apiInstance();
    return api.post("users/sign-in", {
      email,
      password,
    });
  },
  updatePassword: function (params: UpdatePasswordParams) {
    const { currentPassword, newPassword, token } = params;
    const api = apiInstance({ token });
    return api.patch("/users/update-password", {
      currentPassword,
      newPassword,
    });
  },
  updatePersonalData: function (params: UpdatePersonalDataParams) {
    const { email, username, token } = params;
    const api = apiInstance({ token });
    return api.patch("/users", {
      email,
      username,
    });
  },
};
