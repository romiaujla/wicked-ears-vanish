import { AuthBindings, type AuthActionResponse } from "@refinedev/core";
import { API_URL, dataProvider } from "./data";

export const authCredentials = {
  username: "raman.aujla@dundermifflin.com",
  password: "demodemo",
};

export const authProvider: AuthBindings = {
  login: async ({ email }): Promise<AuthActionResponse> => {
    try {
      const { data } = await dataProvider.custom({
        url: API_URL,
        method: "post",
        headers: {},
        meta: {
          variables: { email },
          rawQuery: `
            mutation login($email: String!) {
                login(loginInput: { email: $email }) {
                    accessToken
                }
            }`,
        },
      });

      localStorage.setItem("access_token", data.login.accessToken);

      return {
        success: true,
        redirectTo: "/",
      };
    } catch (e) {
      const error = e as Error;

      return {
        success: false,
        error: {
          message: "message" in error ? error.message : "Login Failed",
          name: "name" in error ? error.name : "Invalid Email or Password",
        },
      };
    }
  },

  logout: async (): Promise<AuthActionResponse> => {
    localStorage.removeItem("access_token");

    return { success: true, redirectTo: "/login" };
  },

  onError: async (error): Promise<AuthActionResponse> => {
    return { success: false, error };
  },

  check: async (): Promise<AuthActionResponse> => {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      return {
        authenticated: false,
        redirectTo: "/login",
      };
    }

    return {
      authenticated: true,
    };
  },

  getIdentity: async () => {},
};
