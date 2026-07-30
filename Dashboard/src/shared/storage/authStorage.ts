import { TOKEN_KEY } from "../constants/constants";

export const authStorage = {
  getToken: () => localStorage.getItem(TOKEN_KEY),

  setToken: (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
  },

  removeToken: () => {
    localStorage.removeItem(TOKEN_KEY);
  },

  clear: () => {
    localStorage.clear();
  },
};
