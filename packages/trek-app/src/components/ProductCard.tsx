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
import s, { COLOR_PRIMARY } from "helper/theme"

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
        bg="#fff"
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
        mx={heightPercentageToDP(1)}
        // h={heightPercentageToDP(50)}
        rounded={12}
        w={widthPercentageToDP(40)}
        alignItems="center"
        alignSelf="center"
      >
        <Image
          width={widthPercentageToDP(35)}
          scalable
          source={{
            uri:
              productModel?.images?.length > 0
                ? productModel?.images[0].url
                : null,
          }}
          style={{ marginBottom: 10, borderRadius: 10 }}
        />
        <Div maxW={widthPercentageToDP(35)}>
          <Text fontWeight="bold" textAlign="center" mb={5} numberOfLines={3}>
            {productModel.name}
          </Text>
          <Text fontSize={10} textAlign="center">{`${formatCurrency(
            productModel.priceMin,
          )} s/d\n${formatCurrency(productModel.priceMax)}`}</Text>
        </Div>
      </Div>
    </Pressable>
  )
}
