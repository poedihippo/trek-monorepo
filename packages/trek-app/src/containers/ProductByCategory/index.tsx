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
import { FlatList, Pressable, useWindowDimensions } from "react-native"
import { Button, Div } from "react-native-magnus"
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen"

import Error from "components/Error"
import Image from "components/Image"
import Loading from "components/Loading"
import NewProductCard from "components/NewProductCard"
import Text from "components/Text"

import useMultipleQueries from "hooks/useMultipleQueries"

import { useCart } from "providers/Cart"

import useProductbyCategory from "api/hooks/pos/product/useProductbyCategory"

import { EntryStackParamList } from "Router/EntryStackParamList"
import {
  MainTabParamList,
  ProductStackParamList,
} from "Router/MainTabParamList"

import { formatCurrency, responsive } from "helper"
import Languages from "helper/languages"
import s, { COLOR_PRIMARY } from "helper/theme"

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
  console.warn(route.params)
  useEffect(() => {
    if (brandName) {
      navigation.setOptions({
        title: Case.title(brandName),
      })
    }
  }, [navigation, brandName])

  const {
    queries: [{ data: dataList }],
    meta: {
      isError,
      isLoading,
      isFetching,
      refetch,
      isFetchingNextPage,
      hasNextPage,
      fetchNextPage,
    },
  } = useMultipleQueries([
    useProductbyCategory({
      "filter[product_category_id]": brandId.toString(),
    }),
  ] as const)
  if (isError) {
    return <Error refreshing={isFetching} onRefresh={refetch} />
  }
  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <Div bg="#fff">
        {/* <Input
          placeholder="Search.."
          value={productName}
          onChangeText={(val) => setProductName(val)}
          mt={heightPercentageToDP(2)}
          ml={heightPercentageToDP(2)}
          mr={heightPercentageToDP(2)}
        /> */}
      </Div>
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          contentContainerStyle={[{ flexGrow: 1 }, s.bgWhite]}
          data={dataList?.data}
          keyExtractor={({ name }) => `model_${name}`}
          showsVerticalScrollIndicator={false}
          bounces={false}
          numColumns={2}
          columnWrapperStyle={[
            s.pX20,
            // s.pY20,
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
          // ListFooterComponent={() =>
          //   !!data &&
          //   data.length > 0 &&
          //   (isFetchingNextPage ? <FooterLoading /> : <EndOfList />)
          // }
          renderItem={({ item: productModel, index }) => (
            <NewProductCard
              key={`model_${productModel.id}`}
              productModel={productModel}
              onPress={() =>
                // navigation.navigate("ProductDetail", { id: productModel.id })
                null
              }
              imageWidth={0.4 * screenWidth}
            />
          )}
        />
      )}
    </>
  )
}
const RenderCard = ({ productModel, key }) => {
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
    <Pressable style={[{ alignItems: "center" }]}>
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
          <Text mb={5} fontSize={14} numberOfLines={2}>
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
