import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import Case from "case"
import React, { useEffect, useState } from "react"
import { FlatList, useWindowDimensions } from "react-native"
import { Div, Input } from "react-native-magnus"
import { heightPercentageToDP } from "react-native-responsive-screen"

import EndOfList from "components/CommonList/EndOfList"
import FooterLoading from "components/CommonList/FooterLoading"
import Error from "components/Error"
import Loading from "components/Loading"
import NewProductCard from "components/NewProductCard"
import ProductCard from "components/ProductCard"
import Text from "components/Text"

import useMultipleQueries from "hooks/useMultipleQueries"

import useProductList from "api/hooks/pos/product/useProductList"
import useProductModelList from "api/hooks/pos/product/useProductModelList"

import { EntryStackParamList } from "Router/EntryStackParamList"
import {
  ProductStackParamList,
  MainTabParamList,
} from "Router/MainTabParamList"

import Languages from "helper/languages"
import { dataFromPaginated } from "helper/pagination"
import s from "helper/theme"

import { ProductModel } from "types/POS/Product/ProductModel"

type CurrentScreenRouteProp = RouteProp<ProductStackParamList, "ProductByBrand">
type CurrentScreenNavigationProp = CompositeNavigationProp<
  CompositeNavigationProp<
    StackNavigationProp<ProductStackParamList, "ProductByBrand">,
    BottomTabNavigationProp<MainTabParamList>
  >,
  StackNavigationProp<EntryStackParamList>
>

export default () => {
  const route = useRoute<CurrentScreenRouteProp>()
  const navigation = useNavigation<CurrentScreenNavigationProp>()
  const [productName, setProductName] = useState("")
  const { width: screenWidth } = useWindowDimensions()

  const brandName = route?.params?.brandName ?? "Brand"

  const brandId = route?.params?.id ?? -1
  if (brandId === -1) {
    if (navigation.canGoBack()) {
      navigation.goBack()
    } else {
      navigation.navigate("Dashboard")
    }
    toast(Languages.PageNotFound)
    return null
  }

  useEffect(() => {
    if (brandName) {
      navigation.setOptions({
        title: Case.title(brandName),
      })
    }
  }, [navigation, brandName])

  const {
    queries: [{ data: brandPaginatedData }],
    meta: {
      isError,
      isLoading,
      isFetching,
      refetch,
      manualRefetch,
      isManualRefetching,
      isFetchingNextPage,
      hasNextPage,
      fetchNextPage,
    },
  } = useMultipleQueries([
    useProductList({
      filterProductBrandId: brandId.toString(),
      filterName: productName,
    }),
  ] as const)

  const data: any[] = dataFromPaginated(brandPaginatedData)

  if (isError) {
    return <Error refreshing={isFetching} onRefresh={refetch} />
  }

  // if (isLoading) {
  //   return <Loading />
  // }

  return (
    <>
      <Div bg="#fff">
        <Input
          placeholder="Search.."
          value={productName}
          onChangeText={(val) => setProductName(val)}
          mt={heightPercentageToDP(2)}
          ml={heightPercentageToDP(2)}
          mr={heightPercentageToDP(2)}
        />
      </Div>
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          contentContainerStyle={[{ flexGrow: 1 }, s.bgWhite]}
          data={data}
          keyExtractor={({ name }) => `model_${name}`}
          showsVerticalScrollIndicator={false}
          bounces={false}
          numColumns={2}
          columnWrapperStyle={[
            s.pX20,
            s.pY20,
            { justifyContent: "space-between" },
          ]}
          ListEmptyComponent={
            <Text fontSize={14} textAlign="center" p={20}>
              Kosong
            </Text>
          }
          onEndReachedThreshold={0.2}
          onEndReached={() => {
            if (hasNextPage) fetchNextPage()
          }}
          ListFooterComponent={() =>
            !!data &&
            data.length > 0 &&
            (isFetchingNextPage ? <FooterLoading /> : <EndOfList />)
          }
          renderItem={({ item: productModel, index }) => (
            <NewProductCard
              key={`model_${productModel.id}`}
              productModel={productModel}
              onPress={() =>
                navigation.navigate("ProductDetail", { id: productModel.id })
              }
              imageWidth={0.4 * screenWidth}
            />
          )}
        />
      )}
    </>
  )
}
