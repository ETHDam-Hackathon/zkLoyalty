import { create } from "zustand";

export const useStore = create(() => ({ url: "https://google.de", code: "", done: false, codeVerifier: "", access_token: "", userId: "", refresh_token: "" }));
