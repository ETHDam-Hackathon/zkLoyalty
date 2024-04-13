import { StyleSheet } from "react-native";
import WebView from "react-native-webview";

import { useStore } from "./store";
import { router } from "expo-router";
import axios from "axios";

export default function ModalScreen() {
  const url = useStore.getState().url;

  return (
    <WebView
      style={{ flex: 1 }}
      source={{ uri: url }}
      onNavigationStateChange={(navState) => {
        navState.url.includes("https://example.com/?") && router.back();
        const code = navState.url.split("https://example.com/?code=")[1];
        if (code) {
          useStore.setState({
            code: code.split("&state=")[0],
          });
          useStore.setState({
            done: true,
          });

          axios
            .post(
              "https://api.monerium.dev/auth/token",
              new URLSearchParams({
                grant_type: "authorization_code",
                client_id: "5317e3d4-b890-11ee-ac06-26c1ce817205",
                code: code.split("&state=")[0],
                code_verifier: useStore.getState().codeVerifier,
                redirect_uri: "https://example.com",
              }),
              {
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
              }
            )
            .then((response) => {
              useStore.setState({
                refresh_token: response.data.refresh_token,
              });
              useStore.setState({
                access_token: response.data.access_token,
              });

              useStore.setState({
                userId: response.data.userId,
              });
            })
            .catch((error) => {
              console.error(error);
            });

          const userId = useStore.getState().userId;
          const refresh_token = useStore.getState().refresh_token;
          const access_token = useStore.getState().access_token;

          console.log("userId: " + userId);
          console.log("refresh_token: " + refresh_token);
          console.log("access_token: " + access_token);
        }
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 0,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
