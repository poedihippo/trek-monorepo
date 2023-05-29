import {
  useFonts
} from "@expo-google-fonts/roboto"
import AppLoading from "expo-app-loading"
import "intl"
import "intl/locale-data/jsonp/id"
import React from "react"
import { LogBox, TouchableOpacity } from "react-native"
import { ThemeProvider } from "react-native-magnus"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { enableScreens } from "react-native-screens"
import "react-native-url-polyfill/auto"
import { QueryClientProvider } from "react-query"

import ErrorBoundary from "components/ErrorBoundary"
import { AuthProvider } from "providers/Auth"
import { CartProvider } from "providers/Cart"
import { RecoilRoot } from "recoil"

import { theme } from "helper/theme"

import { queryClient } from "./src/query"
import Root from "./src/Root"

enableScreens()

// Suppress timer warnings
const ignoreWarns = [
  "Setting a timer for a long period of time",
  "VirtualizedLists should never be nested inside plain ScrollViews with the same orientation",
  "ViewPropTypes will be removed",
  "AsyncStorage has been extracted from react-native",
  "EventEmitter.removeListener",
]
LogBox.ignoreLogs(ignoreWarns)

// @ts-ignore
TouchableOpacity.defaultProps = {
  // @ts-ignore
  ...TouchableOpacity.defaultProps,
  delayPressIn: 50,
  activeOpacity: 0.8,
}

export default () => {
  const [fontLoaded] = useFonts({
    FontRegular: require("./src/assets/font/Poppins-Regular.ttf"),
    FontBold: require("./src/assets/font/Poppins-Bold.ttf"),
  })

  if (!fontLoaded) {
    return <AppLoading />
  }

  return (
    <SafeAreaProvider>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <RecoilRoot>
          <ComposeProvider providers={[AuthProvider, CartProvider]}>
            <ThemeProvider theme={theme}>
              <Root />
            </ThemeProvider>
          </ComposeProvider>
          </RecoilRoot>
        </QueryClientProvider>
      </ErrorBoundary>
    </SafeAreaProvider>
  )
}

const ComposeProvider = ({ providers, children }) => {
  return providers.reverse().reduce((acc, Val) => <Val>{acc}</Val>, children)
}
