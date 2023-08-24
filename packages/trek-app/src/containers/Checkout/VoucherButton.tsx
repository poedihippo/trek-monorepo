import React, { useState } from "react"
import { FlatList, useWindowDimensions } from "react-native"
import { Button, Div, Icon, Modal } from "react-native-magnus"
import { heightPercentageToDP } from "react-native-responsive-screen"

import Image from "components/Image"
import Loading from "components/Loading"
import Text from "components/Text"

import useMultipleQueries from "hooks/useMultipleQueries"

import useVoucherList from "api/hooks/vouchers/useVoucherList"

import { formatCurrency, responsive } from "helper"
import { COLOR_DISABLED, COLOR_PRIMARY } from "helper/theme"

export default ({ activeVoucher, setVoucher, disabled, leadId }) => {
  const { width: screenWidth } = useWindowDimensions()
  const {
    queries: [{ data: dataList }],
    meta: { isLoading, isError, isFetching, refetch },
  } = useMultipleQueries([
    useVoucherList({
      "filter[lead_id]": leadId,
    }),
  ])
  const voucher = dataList?.data
  console.log(voucher, "check voucher")
  const [visible, setVisible] = useState(false)
  const hideModal = () => setVisible(false)
  return (
    <Div mt={5} px={20} pt={20} bg="white">
      {/* {activeDiscount.length > 0 ? (
        <Button
          block
          py={20}
          px={10}
          borderWidth={1}
          borderColor="grey"
          bg="white"
          justifyContent="flex-start"
          onPress={() => setVisible(true)}
          disabled={disabled}
        >
          <Div flex={1} row justifyContent="space-between" alignItems="center">
            <Div row alignItems="center">
              <Image
                width={responsive(24)}
                scalable
                source={require("assets/icon_promo.png")}
                style={{ tintColor: COLOR_PRIMARY }}
              />
              <Div ml={10} maxW={0.6 * screenWidth}>
                {discountDetail.map((e) => (
                  <Text fontSize={14} fontWeight="bold">
                    {e?.name}
                  </Text>
                ))}
                <Text>{activeDiscount?.description}</Text>
              </Div>
            </Div>
            <Icon
              p={5}
              name="chevron-forward"
              color="primary"
              fontSize={18}
              fontFamily="Ionicons"
            />
          </Div>
        </Button>
      ) : ( */}
      <Button
        block
        py={20}
        px={10}
        borderWidth={1}
        borderColor="grey"
        bg="white"
        justifyContent="flex-start"
        onPress={() => setVisible(true)}
        disabled={disabled}
      >
        <Div flex={1} row justifyContent="space-between" alignItems="center">
          <Div row alignItems="center">
            <Image
              width={responsive(24)}
              scalable
              source={require("assets/icon_promo.png")}
              style={{ tintColor: COLOR_PRIMARY }}
            />
            <Text ml={10} fontSize={14} fontWeight="bold">
              Voucher
            </Text>
          </Div>
          <Icon
            p={5}
            name="chevron-forward"
            color="primary"
            fontSize={18}
            fontFamily="Ionicons"
          />
        </Div>
      </Button>
      {/* )} */}
      <Modal
        useNativeDriver
        isVisible={visible}
        onBackdropPress={hideModal}
        animationIn={"slideInUp"}
        onBackButtonPress={hideModal}
        onDismiss={hideModal}
        onModalHide={hideModal}
        h="80%"
      >
        <Div
          shadow="sm"
          p={20}
          bg="white"
          borderBottomWidth={1}
          borderColor={COLOR_DISABLED}
        >
          <Text fontSize={16} fontWeight="bold">
            Voucher List
          </Text>
        </Div>
        <Div row px={20} pt={20} bg="white">
          {/* <Input
          flex={1}
          mr={5}
          placeholder={"Input Discount Name / Code Here"}
          focusBorderColor="primary"
          value={discountCode}
          onChangeText={(val) => {
            setDiscountCode(val)
          }}
        /> */}
        </Div>
        {isLoading ? (
          <Loading />
        ) : (
          <FlatList
            data={voucher}
            keyExtractor={(item, index) => `discount_${index}`}
            showsVerticalScrollIndicator={false}
            bounces={false}
            onEndReachedThreshold={0.2}
            renderItem={({ item, index }) => {
              return (
                <>
                  {item?.is_used == true ? null : (
                    <Div
                      mx={20}
                      mt={20}
                      rounded={8}
                      bg="white"
                      shadow="sm"
                      mb={heightPercentageToDP(2)}
                    >
                      <Div
                        px={20}
                        py={10}
                        borderBottomWidth={0.8}
                        borderBottomColor="grey"
                        row
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Text flex={1} fontWeight="bold">
                          {item?.voucher_id}
                        </Text>
                        <Button
                          px={20}
                          bg={
                            activeVoucher.find((e) => e === item.voucher_id) !==
                            undefined
                              ? "#e84118"
                              : "primary"
                          }
                          color="white"
                          onPress={() => {
                            activeVoucher.find((e) => e === item.voucher_id) !==
                            undefined
                              ? setVoucher(
                                  activeVoucher.filter(
                                    (e) => e !== item.voucher_id,
                                  ),
                                )
                              : setVoucher(
                                  activeVoucher.concat(item.voucher_id),
                                )
                          }}
                        >
                          {activeVoucher.find((e) => e === item.voucher_id) !==
                          undefined
                            ? "Delete"
                            : "Apply"}
                        </Button>
                      </Div>
                      <Text px={20} py={10}>
                        {formatCurrency(item?.voucher?.value)}
                      </Text>
                    </Div>
                  )}
                </>
              )
            }}
          />
        )}
      </Modal>
    </Div>
  )
}

const DiscountCard = ({
  item,
  setActiveDiscount,
  activeDiscount,
  setDiscountDetail,
}: {
  item: any
  activeDiscount: []
  setActiveDiscount: (val) => void
  setDiscountDetail: (val) => void
}) => {
  return (
    <Div mx={20} mt={20} rounded={8} bg="white" shadow="sm">
      <Div
        px={20}
        py={10}
        borderBottomWidth={0.8}
        borderBottomColor="grey"
        row
        justifyContent="space-between"
        alignItems="center"
      >
        <Text flex={1} fontWeight="bold">
          {item?.name}
        </Text>
        <Button
          px={20}
          bg={
            activeDiscount.find((e) => e === item.id) !== undefined
              ? "#e84118"
              : "primary"
          }
          color="white"
          onPress={() => {
            setActiveDiscount(item.id)
            setDiscountDetail(item)
          }}
        >
          {activeDiscount.find((e) => e === item.id) !== undefined
            ? "Delete"
            : "Apply"}
        </Button>
      </Div>
      <Text px={20} py={10}>
        {item?.description}
      </Text>
    </Div>
  )
}
