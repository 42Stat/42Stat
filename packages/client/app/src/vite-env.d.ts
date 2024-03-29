/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_EP: string;
  /**
   * @description google gsi client url
   */
  readonly VITE_GAPI_URL: string;
  readonly VITE_GAPI_CLIENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
