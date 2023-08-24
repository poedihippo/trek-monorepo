import * as ImagePicker from "expo-image-picker"
import React, { Dispatch, useEffect } from "react"
import { Image, Dimensions, ImageBackground, Pressable } from "react-native"
import { Div } from "react-native-magnus"
import { widthPercentageToDP } from "react-native-responsive-screen"

import Text from "components/Text"

import { responsive } from "helper"

export type ImageResultType = ImagePicker.ImagePickerResult & {
  uri: string
}

type UploadPicturePropTypes = {
  value: ImageResultType | null
  setValue: Dispatch<ImageResultType | null>
  text: string
  aspectRatio?: [number, number]
  marginHorizontal?: number
  isOrder?: boolean
}

const { width } = Dimensions.get("window")

export default ({
  value,
  setValue,
  text,
  isOrder,
  aspectRatio = [1, 1],
  marginHorizontal = responsive(20),
}: UploadPicturePropTypes) => {
  useEffect(() => {
    ImagePicker.requestCameraPermissionsAsync()
    ImagePicker.requestMediaLibraryPermissionsAsync()
  }, [])

  const imageLength = width - marginHorizontal * 2
  const iconDimension = 0.2 * imageLength

  const pickImage = async (pickerFunc) => {
    let result: ImageResultType = await pickerFunc({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: aspectRatio,
      quality: 1,
    })

    if (!result.cancelled) {
      setValue(result)
    }
  }

  return (
    <Div w={100}>
      <Pressable
        onPress={() =>
          !!isOrder ? pickImage(ImagePicker.launchImageLibraryAsync) : null
        }
      >
        <Div
          mt={10}
          borderColor="gray400"
          borderWidth={1}
          justifyContent="center"
          alignItems="center"
          style={{
            width: 100,
            height: 100,
          }}
        >
          <ImageBackground
            source={require("assets/icon_verifikasi.png")}
            style={[
              {
                width: iconDimension,
                height: iconDimension,
                position: "absolute",
                alignSelf: "center",
              },
            ]}
          />
          {value && (
            <Image
              source={{ uri: value.uri }}
              style={{
                width: 100,
                height: 100,
              }}
            />
          )}
          {!value && (
            <Text textAlign="center" pt={100}>
              {text}
            </Text>
          )}
        </Div>
      </Pressable>
    </Div>
  )
}
