const CREATE_ACCOUNT = "Create account";
const LOG_IN = "Log in";
const CHECK_OUT = "Checkout";
const EmailInputValidate = {
  required: true,
  pattern: /^\S+@\S+$/i,
};
const PasswordInputValidate = {
  required: true,
  minLength: 5,
};
const UserNameInputValidate = {
  required: true,
  minLength: 5,
  maxLength: 15,
};
export default {
  CREATE_ACCOUNT,
  LOG_IN,
  CHECK_OUT,
  EmailInputValidate,
  PasswordInputValidate,
  UserNameInputValidate,
};
