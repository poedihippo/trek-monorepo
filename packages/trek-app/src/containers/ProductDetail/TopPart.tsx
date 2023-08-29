import { LinearGradient } from "expo-linear-gradient"
import React from "react"
import { TouchableOpacity, useWindowDimensions } from "react-native"
import { Button, Div } from "react-native-magnus"
import Carousel from "react-native-snap-carousel"

import Image from "components/Image"
import Text from "components/Text"

import { formatCurrency } from "helper"

import { ProductModel } from "types/POS/Product/ProductModel"

type PropTypes = {
  productModel: ProductModel
  onProductSelect: () => void
}

export default ({ productModel, onProductSelect }: PropTypes) => {
  const { width: screenWidth } = useWindowDimensions()
  
  return (
    <>
      <Carousel
        // @ts-ignore
        data={productModel?.images ?? []}
        sliderWidth={screenWidth}
        itemWidth={screenWidth}
        showsHorizontalScrollIndicator={false}
        loop
        autoplay
        autoplayInterval={10000}
        underlayColor="none"
        renderItem={({ item: image }) => (
          <Image width={screenWidth} scalable source={{ uri: image.url }} />
        )}
      />
      <Div bg="white" pt={20} px={20}>
        <Div row justifyContent="space-between" mb={20}>
          <Div>
            <Text fontSize={14} fontWeight="bold" mb={5} w={200}>
              {productModel.name}
            </Text>
            <Text>
              {formatCurrency(productModel.price)}
            </Text>
          </Div>
        </Div>
      </Div>
    </>
  )
}
