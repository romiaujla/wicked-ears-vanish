import { AuthPage } from "@refinedev/antd";
import { authCredentials } from "../../providers/auth";

export const Login = () => {
  console.log("authCredentials", authCredentials);
  return (
    <AuthPage
      type="login"
      formProps={{
        initialValues: authCredentials,
      }}
    />
  );
};
