import { useNavigation } from "@react-navigation/native"
import React from "react"
import { TouchableOpacity, Dimensions, Pressable } from "react-native"
import { Button, Div } from "react-native-magnus"
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen"

import Image from "components/Image"
import Text from "components/Text"

import { useCart } from "providers/Cart"

import { formatCurrency, responsive } from "helper"
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
  const { addItem } = useCart()
  const navigation = useNavigation()
  const onAddToCard = (item) => {
    addItem([
      {
        productUnitId: item.id,
        quantity: 1,
        productUnitData: item,
      },
    ])
    navigation.navigate("Cart")
  }

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
        mb={heightPercentageToDP(2)}
        mx={heightPercentageToDP(0.5)}
        h={heightPercentageToDP(35)}
        rounded={6}
        w={widthPercentageToDP(40)}
        alignSelf="center"
      >
        <Image
          source={{
            uri:
              productModel?.images?.length > 0
                ? productModel?.images[0].url
                : null,
          }}
          style={{
            borderTopLeftRadius: 6,
            borderTopRightRadius: 6,
            width: widthPercentageToDP(40),
            height: heightPercentageToDP(18),
            resizeMode: "contain",
          }}
        />
        <Div p={8} overflow="hidden">
          <Text  mb={5} fontSize={14} numberOfLines={2}>
            {productModel.name}
          </Text>
          <Text fontSize={10} fontWeight="bold" mb={10}>{`${formatCurrency(
            productModel.price,
          )}`}</Text>
          <Button
            onPress={() => onAddToCard(productModel)}
            // h={heightPercentageToDP(4)}
            bg="primary"
            w={widthPercentageToDP(30)}
            alignSelf="center"
            textAlign="center"
            fontSize={responsive(8)}
          >
            Add to cart
          </Button>
        </Div>
      </Div>
    </Pressable>
  )
}
