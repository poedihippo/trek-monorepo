import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import React from "react"
import { FlatList } from "react-native"
import { Div } from "react-native-magnus"

import Error from "components/Error"
import Loading from "components/Loading"
import ProductCategoriesCard from "components/ProductCategoriesCard"
import Text from "components/Text"

import useMultipleQueries from "hooks/useMultipleQueries"

import useProductCategories from "api/hooks/pos/product/useProductCategories"

import {
  MainTabParamList,
  ProductStackParamList,
} from "Router/MainTabParamList"

import s from "helper/theme"

type CurrentScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<ProductStackParamList, "Product">,
  BottomTabNavigationProp<MainTabParamList>
>

type PropTypes = {}

export default (props: PropTypes) => {
  const navigation = useNavigation<CurrentScreenNavigationProp>()

  const {
    queries: [{ data: productModelsData }],
    meta: { isLoading, isError, isFetching, refetch },
  } = useMultipleQueries([useProductCategories({})] as const)

  // const productModels: ProductModel[] = dataFromPaginated(productModelsData)

  if (isError) {
    return <Error refreshing={isFetching} onRefresh={refetch} />
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <Div borderTopWidth={10} borderBottomWidth={10} borderColor="#f0f3fa">
      <Text fontSize={14} fontWeight="bold" ml={20} my={10}>
        Product Category
      </Text>
      <FlatList
        horizontal
        data={productModelsData?.data?.data}
        keyExtractor={({ id }) => `product_${id}`}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={[s.pX20]}
        renderItem={({ item: productModel, index }) => (
          <ProductCategoriesCard
            key={`product_${productModel.id}`}
            productModel={productModel}
            onPress={() =>
              navigation.navigate("ProductByCategory", {
                id: productModel.id,
                brandName: productModel.name,
              })
            }
            containerStyle={[s.mR10]}
          />
        )}
      />
    </Div>
  )
}
