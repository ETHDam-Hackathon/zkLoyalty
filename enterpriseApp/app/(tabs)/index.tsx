import {
  Colors,
  View,
  Card,
  CardProps,
  Button,
  Text,
} from "react-native-ui-lib";

import { W3mButton } from "@web3modal/wagmi-react-native";

import { Dimensions, Pressable, StyleSheet } from "react-native";
import { BearerProfile, MoneriumClient } from "@monerium/sdk";

import CryptoJS from "crypto-js";
import axios from "axios";
import { Link, router } from "expo-router";

import { useStore } from "../store";
import { useEffect } from "react";

const codeVerifier = CryptoJS.lib.WordArray.random(64).toString();
useStore.setState({ codeVerifier: codeVerifier });

export default function TabOneScreen() {
  return (
    <>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <W3mButton />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
