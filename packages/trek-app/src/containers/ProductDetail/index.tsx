import { useRoute } from "@react-navigation/native"
import { LinearGradient } from "expo-linear-gradient"
import React, { useState } from "react"
import { FlatList, TouchableOpacity, useWindowDimensions } from "react-native"
import { Button, Div, Text } from "react-native-magnus"

import WYSIWYG from "components/WYSIWYG"

import { useCart } from "providers/Cart"

import { COLOR_DISABLED } from "helper/theme"

import TopPart from "./TopPart"
import TotalFooter from "./TotalFooter"

export default () => {
  const route = useRoute()
  const { width: screenWidth } = useWindowDimensions()
  const productModel = route.params
  const { addItem } = useCart()
  console.log(productModel)
  return (
    <>
      <Div flex={1}>
        <FlatList
          contentContainerStyle={{ flexGrow: 1, backgroundColor: "white" }}
          data={[]}
          keyExtractor={(item, index) => `product_selection_${index}`}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <>
              <TopPart
                productModel={productModel}
                onProductSelect={() => undefined}
              />
            </>
          }
          bounces={false}
          renderItem={({ item: productUnitSelection, index }) => {
            return <Text>cobain aprilios</Text>
          }}
          ListFooterComponent={
            <>
              <VarianSelect />
              <Div
                p={20}
                bg="white"
                borderTopColor={"#f5f6fa"}
                borderTopWidth={5}
              >
                <Div mb={20}>
                  <Text fontSize={14} fontWeight="bold" mb={5}>
                    Description :
                  </Text>
                  <WYSIWYG body={productModel.description} />
                  <Text>
                    Once upon a time in a lush and vibrant forest, lived a
                    clever and cunning creature named Kancil. Kancil was a small
                    mouse deer known for his quick wit and mischievous nature.
                    He had an insatiable appetite for juicy and plump timun, or
                    cucumbers, that grew near a nearby village. One sunny
                    morning, as the sun's rays danced through the trees,
                    Kancil's stomach rumbled loudly. He couldn't resist the
                    thought of the village's succulent timun. However, the timun
                    were guarded by the villagers who were tired of Kancil's
                    constant thievery. Unfazed by the villagers' efforts to keep
                    him away, Kancil hatched a clever plan to steal timun
                    without getting caught. He knew that the villagers were wary
                    of his tricks, so he needed to be extra cunning this time.
                    Kancil approached a group of monkeys who were known
                    troublemakers themselves. He flattered them, saying, "Oh
                    wise and strong monkeys, I have heard of your legendary
                    climbing skills. I bet none of you can reach the ripest
                    timun at the very top of the vine!"
                  </Text>
                </Div>
              </Div>
            </>
          }
        />
        <TotalFooter
          totalPrice={productModel.price}
          buttonComponents={
            <>
              <Button
                onPress={() => {
                  addItem([
                    {
                      productUnitId: productModel.id,
                      quantity: 1,
                      productUnitData: productModel,
                    },
                  ])
                  toast("Barang berhasil ditambahkan ke keranjang")
                }}
                px={10}
                py={5}
              >
                + Cart
              </Button>
            </>
          }
        />
      </Div>
    </>
  )
}

const VarianSelect = () => {
  const [selected, setSelected] = useState(0)
  return (
    <Div p={20} bg="white" borderTopColor={"#f5f6fa"} borderTopWidth={5}>
      <Div mb={10}>
        <Text fontSize={14} fontWeight="bold" mb={5}>
          Varian :{" "}
          <Text>
            {selected === 1
              ? "standar"
              : selected === 2
              ? "deluxe"
              : selected === 3
              ? "premium"
              : null}
          </Text>
        </Text>
        <Div row>
          <Button
            onPress={() => setSelected(1)}
            px={10}
            py={5}
            mr={5}
            borderWidth={1}
            borderColor={selected === 1 ? "primary" : COLOR_DISABLED}
            bg={selected === 1 ? "#dff9fb" : "white"}
            color={selected === 1 ? "primary" : null}
          >
            standard
          </Button>
          <Button
            onPress={() => setSelected(2)}
            px={10}
            py={5}
            mr={5}
            borderWidth={1}
            borderColor={selected === 2 ? "primary" : COLOR_DISABLED}
            bg={selected === 2 ? "#dff9fb" : "white"}
            color={selected === 2 ? "primary" : null}
          >
            Deluxe
          </Button>
          <Button
            onPress={() => setSelected(3)}
            px={10}
            py={5}
            mr={5}
            borderWidth={1}
            borderColor={selected === 3 ? "primary" : COLOR_DISABLED}
            bg={selected === 3 ? "#dff9fb" : "white"}
            color={selected === 3 ? "primary" : null}
          >
            Premium
          </Button>
        </Div>
      </Div>
    </Div>
  )
}
