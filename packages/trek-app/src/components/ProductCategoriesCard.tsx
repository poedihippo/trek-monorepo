import React from "react"
import { TouchableOpacity, Dimensions, Pressable } from "react-native"
import { Div } from "react-native-magnus"
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen"

import Image from "components/Image"
import Text from "components/Text"

import { formatCurrency } from "helper"
import s, { COLOR_BLUE, COLOR_PRIMARY } from "helper/theme"

import { ProductModel } from "types/POS/Product/ProductModel"

type PropTypes = {
  productModel: ProductModel
  onPress: () => void
  imageWidth?: number
  containerStyle?: object
}

export default ({
  productModel,
  onPress,
  imageWidth = 0.3 * Dimensions.get("window").width,
  containerStyle = {},
}: PropTypes) => {
  return (
    <Pressable
      onPress={onPress}
      style={[{ alignItems: "center" }, containerStyle]}
    >
      <Div
        bg={"white"}
        style={{
          shadowColor: COLOR_PRIMARY,
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.27,
          shadowRadius: 4.65,

          elevation: 6,
        }}
        mt={heightPercentageToDP(2)}
        mb={heightPercentageToDP(2)}
        mx={heightPercentageToDP(0.5)}
        h={heightPercentageToDP(23)}
        rounded={6}
        w={widthPercentageToDP(40)}
        alignItems="center"
        alignSelf="center"
      >
        <Image
          source={{
            uri: productModel?.photo?.url,
          }}
          style={{
            borderTopLeftRadius: 6,
            borderTopRightRadius: 6,
            width: widthPercentageToDP(40),
            height: heightPercentageToDP(18),
            resizeMode: "contain",
          }}
        />
        <Div maxW={widthPercentageToDP(35)}>
          <Text fontWeight="bold" textAlign="center" my={5} numberOfLines={3}>
            {productModel.name}
          </Text>
        </Div>
      </Div>
    </Pressable>
  )
}
