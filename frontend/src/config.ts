declare global {
  interface ImportMetaEnv {
    VITE_HOST_API: string;
  }
}

export const { VITE_API_HOST: API_HOST } = import.meta.env;
