import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { BackgroundLogin, BannerLogin } from "assets/svg"
import React from "react"
import { useWindowDimensions, ScrollView } from "react-native"
import { Div } from "react-native-magnus"
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen"
import { SvgUri, SvgXml } from "react-native-svg"

import CustomKeyboardAvoidingView from "components/CustomKeyboardAvoidingView"
import Image from "components/Image"
import Text from "components/Text"

import { useAuth } from "providers/Auth"

import LoginForm from "forms/LoginForm"

import useLoginMutation from "api/hooks/user/useLoginMutation"

import { EntryStackParamList } from "Router/EntryStackParamList"

import { responsive } from "helper"
import Languages from "helper/languages"
import { COLOR_PRIMARY } from "helper/theme"

type CurrentScreenNavigationProp = StackNavigationProp<
  EntryStackParamList,
  "Login"
>

export default () => {
  const navigation = useNavigation<CurrentScreenNavigationProp>()
  const { height: screenHeight, width: screenWidth } = useWindowDimensions()

  const [login] = useLoginMutation()
  const { onLogin } = useAuth()

  return (
    <CustomKeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView
        bounces={false}
        contentContainerStyle={{
          flexGrow: 1,
          // justifyContent: "center",
          backgroundColor: "#fff",
        }}
      >
        <Div w="100%" justifyContent="center" alignItems="center">
          <Image
            width={widthPercentageToDP(90)}
            source={require("assets/TrekLogo.png")}
            resizeMode="contain"
            scalable
            style={{marginBottom: heightPercentageToDP(10), marginTop: heightPercentageToDP(20)}}
          />


          {/* <Image
            // style={[{ marginVertical: responsive(60) }]}
            style={{ marginVertical: heightPercentageToDP(3) }}
            source={require("assets/Logo.png")}
            width={screenHeight * 0.2}
            scalable
            resizeMode="contain"
          /> */}
          {/* <Text fontSize={16} fontWeight="bold" color="primary" mb={5}>
            Welcome To SMS
          </Text>
          <Text color="primary" mb={20}>
            Enter your ID to login
          </Text> */}

          <LoginForm          
            onSubmit={(values) => {
              return login(
                { email: values.email, password: values.password },
                (x) =>
                  x.then((res) => {
                    toast(Languages.LoginSuccess)
                    onLogin(res.data)
                    navigation.reset({
                      index: 0,
                      routes: [{ name: "Main" }],
                    })

                    return res
                  }),
              )
            }}
          />
        </Div>
        <Image
          style={{
            position: "absolute",
            height: heightPercentageToDP(100),
            zIndex: -999,
          }}
          source={require("assets/backgroundLogin.webp")}
        />
      </ScrollView>
    </CustomKeyboardAvoidingView>
  )
}
