import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import {
  useNavigation,
  CompositeNavigationProp,
} from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import React, { useEffect, useState } from "react"
import {
  FlatList,
  Pressable,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native"
import { Button, Div, Icon } from "react-native-magnus"
import Modal from "react-native-modal"
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen"
import Carousel from "react-native-snap-carousel"

import FooterLoading from "components/CommonList/FooterLoading"
import Image from "components/Image"
import LeadDropdownInput from "components/LeadDropdownInput"
import Loading from "components/Loading"
import Text from "components/Text"

import useMultipleQueries from "hooks/useMultipleQueries"

import useBrandList from "api/hooks/pos/productCategorization/useBrandList"

import {
  ProductStackParamList,
  MainTabParamList,
} from "Router/MainTabParamList"

import { responsive } from "helper"
import { dataFromPaginated } from "helper/pagination"
import s from "helper/theme"

import { Brand } from "types/POS/ProductCategorization/Brand"

import CafeButton from "./CafeButton"
import NewArrival from "./NewArrival"
import ProductCategory from "./ProductCategory"
import ScanQR from "./ScanQR"
import StockButton from "./StockButton"

type CurrentScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<ProductStackParamList, "Product">,
  BottomTabNavigationProp<MainTabParamList>
>

export default () => {
  const navigation = useNavigation<CurrentScreenNavigationProp>()
  const { width: screenWidth } = useWindowDimensions()

  const [isModalVisible, setIsModalVisible] = useState(false)

  const {
    queries: [{ data: brandPaginatedData }],
    meta: { isLoading, isFetchingNextPage, hasNextPage, fetchNextPage },
  } = useMultipleQueries([useBrandList({})] as const)

  return (
    <>
      <FlatList
        contentContainerStyle={[{ flexGrow: 1 }, s.bgWhite]}
        data={brandPaginatedData?.data?.data}
        keyExtractor={({ name }) => `category_${name}`}
        showsVerticalScrollIndicator={false}
        bounces={false}
        numColumns={2}
        columnWrapperStyle={[
          s.pX20,
          s.pB20,
          { justifyContent: "space-between" },
        ]}
        ListHeaderComponent={
          <Div>
            <Carousel
              // @ts-ignore
              data={["1", "2"]}
              sliderWidth={screenWidth}
              itemWidth={screenWidth}
              showsHorizontalScrollIndicator={false}
              // loop
              // autoplay
              // autoplayInterval={8000}
              underlayColor="none"
              renderItem={({ item: image }) => (
                <Image
                  width={widthPercentageToDP(50)} 
                  // height={'50%'}                    
                  scalable                  
                  source={require("assets/TrekLogo.png")}
                  style={{marginTop: heightPercentageToDP(2), justifyContent: 'center', alignSelf: 'center'}}
                />
              )}
            />

            <Div flex={1} px={20} mb={10} mt={10} row justifyContent="space-between">
              {/* <ScanQR navigate={() => navigation.navigate("ProductSearch")} /> */}
              <CafeButton
                navigate={() => navigation.navigate("ProductUnitSearch")}
              />
            </Div>
            <ProductCategory />
            <NewArrival />
            <Div row justifyContent="space-between">
              <Text fontSize={14} fontWeight="bold" p={20}>
                All Brand
              </Text>
            </Div>
          </Div>
        }
        ListEmptyComponent={() => {
          if (isLoading) {
            return <Loading />
          } else {
            return (
              <Text fontSize={14} textAlign="center" p={20}>
                Kosong
              </Text>
            )
          }
        }}
        onEndReachedThreshold={0.2}
        onEndReached={() => {
          if (hasNextPage) fetchNextPage()
        }}
        ListFooterComponent={() =>
          !!brandPaginatedData?.data?.data &&
          brandPaginatedData?.data?.data?.length > 0 &&
          (isFetchingNextPage ? <FooterLoading /> : null)
        }
        renderItem={({ item, index }) => <BrandCard item={item} />}
      />
    </>
  )
}

const BrandCard = ({ item }: any) => {
  const navigation = useNavigation<CurrentScreenNavigationProp>()
  const { width: screenWidth } = useWindowDimensions()

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("ProductByBrand", {
          id: item.id,
          brandName: item.name,
        })
      }
    >
      <Div>
        <Image
          width={0.4 * screenWidth}
          scalable
          source={{ uri: item?.images?.length > 0 ? item.images[0].url : null }}
          style={[s.mB5]}
        />
        <Text
          maxW={0.4 * screenWidth}
          fontWeight='normal'
          textAlign="center"
          numberOfLines={1}
          fontSize={14}
        >
          {item.name}
        </Text>
      </Div>
    </TouchableOpacity>
  )
}
