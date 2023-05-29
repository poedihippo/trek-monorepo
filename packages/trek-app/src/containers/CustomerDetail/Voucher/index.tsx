import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import {
  useNavigation,
  CompositeNavigationProp,
} from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import React, { useState } from "react"
import { FlatList } from "react-native"
import { Button, Div, Fab, Modal } from "react-native-magnus"
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen"

import AddVoucher from "components/AddVoucher"
import EndOfList from "components/CommonList/EndOfList"
import FooterLoading from "components/CommonList/FooterLoading"
import Error from "components/Error"
import Loading from "components/Loading"
import Text from "components/Text"

import { useAxios } from "hooks/useApi"
import useMultipleQueries from "hooks/useMultipleQueries"

import { useAuth } from "providers/Auth"

import ActivityFilter, { ActivityFilterType } from "filters/ActivityFilter"

import useActivityListByCustomer from "api/hooks/activity/useActivityListByCustomer"
import useVoucherList from "api/hooks/vouchers/useVoucherList"

import { EntryStackParamList } from "Router/EntryStackParamList"
import {
  MainTabParamList,
  CustomerStackParamList,
} from "Router/MainTabParamList"

import { formatCurrency, responsive } from "helper"
import { dataFromPaginated } from "helper/pagination"
import s from "helper/theme"

import { Activity } from "types/Activity"
import { timeIntervalConfig } from "types/TimeInterval"

type CurrentScreenNavigationProp = CompositeNavigationProp<
  CompositeNavigationProp<
    StackNavigationProp<CustomerStackParamList, "CustomerDetail">,
    BottomTabNavigationProp<MainTabParamList>
  >,
  StackNavigationProp<EntryStackParamList>
>

type PropTypes = {
  customerId: number
  leadId: number
  isDeals?: boolean
}

export default ({ customerId, leadId, isDeals = false }: PropTypes) => {
  const [visible, setVisible] = useState(false)
  const hideModal = () => setVisible(false)
  const [newVoucher, setVoucher] = useState()

  const {
    queries: [{ data: dataList }],
    meta: { isLoading, isError, isFetching, refetch },
  } = useMultipleQueries([
    useVoucherList({
      "filter[customer_id]": customerId,
    }),
  ])
  const axios = useAxios()
  const { loggedIn } = useAuth()
  const voucher = dataList?.data
  const createVoucher = () => {
    axios
      .post(
        `vouchers`,
        {
          customer_id: customerId,
          vouchers: newVoucher,
        },
        {
          headers: {
            loggedIn,
          },
        },
      )
      .then((res) => {
        refetch()
        hideModal()
        setVoucher(null)
        toast("Voucher has been created")
      })
      .catch((err) => {
        if (err) {
          console.log(err)
        }
      })
  }
  if (isError) {
    return <Error refreshing={isFetching} onRefresh={refetch} />
  }

  if (isLoading) {
    return <Loading />
  }
  return (
    <>
      {/* <ActivityFilter activeFilterValues={filters} onSetFilter={setFilter} /> */}
      <FlatList
        contentContainerStyle={[{ flexGrow: 1 }, s.bgWhite]}
        data={voucher}
        keyExtractor={(_, idx: number) => idx.toString()}
        showsVerticalScrollIndicator={false}
        bounces={false}
        onEndReachedThreshold={0.2}
        ListEmptyComponent={() => (
          <Text fontSize={14} textAlign="center" p={20}>
            Kosong
          </Text>
        )}
        renderItem={({ item, index }) => (
          <Div
            mx={10}
            justifyContent="space-between"
            row
            bg="white"
            borderStyle="dashed"
            borderWidth={1}
            borderColor="primary"
            p={15}
            rounded={6}
            my={10}
          >
            <Div>
              <Text fontSize={14} fontWeight="bold">
                {item.voucher_id}
              </Text>
              <Text>{formatCurrency(item.voucher.value || 0)}</Text>
            </Div>
            <Div alignItems="flex-end">
              <Text
                allowFontScaling={false}
                color="#fff"
                fontWeight="bold"
                fontSize={responsive(9)}
                h={heightPercentageToDP(2.5)}
                w={widthPercentageToDP(20)}
                textAlign="center"
                bg={
                  item?.voucher?.is_active !== true
                    ? "#D30000"
                    : item?.is_used === false
                    ? "#57B15B"
                    : "#3080ED"
                }
              >
                {item?.voucher?.is_active !== true
                  ? "Expired"
                  : item?.is_used === false
                  ? "Active"
                  : "Used"}
              </Text>
            </Div>
          </Div>
        )}
      />
      <Fab
        bg="primary"
        fontSize={12}
        h={50}
        w={50}
        shadow="sm"
        // @ts-ignore
        onPress={() => setVisible(true)}
      />
      <Modal
        roundedTop={40}
        useNativeDriver
        isVisible={visible}
        onBackdropPress={hideModal}
        animationIn={"slideInUp"}
        onBackButtonPress={hideModal}
        onDismiss={hideModal}
        onModalHide={hideModal}
        h="50%"
      >
        <Div p={20} flex={1}>
          <Text my={15}>Add new voucher</Text>
          <AddVoucher setActiveDiscount={(val) => setVoucher(val)} />
          <Button
            onPress={createVoucher}
            mt={20}
            bg="primary"
            alignSelf="center"
          >
            Create Voucher
          </Button>
        </Div>
      </Modal>
    </>
  )
}
