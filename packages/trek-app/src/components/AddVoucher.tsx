/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useState } from "react"
import { FlatList } from "react-native"
import CurrencyInput from "react-native-currency-input"
import { Button, Div, Icon, Input, Modal, Text } from "react-native-magnus"

import "helper"
import { formatCurrency } from "helper"
import s, { COLOR_DISABLED } from "helper/theme"

export default ({ setActiveDiscount, activeDiscount, discountDetail }) => {
  const [visible, setVisible] = useState(false)
  const [voucherCode, setVoucherCode] = useState("")
  const [voucherValue, setVoucherValue] = useState<number>()
  const [data, setData] = useState([])
  const hideModal = () => setVisible(false)
  const borderStyle = {
    borderWidth: 1,
    borderColor: COLOR_DISABLED,
    borderRadius: 4,
  }
  useEffect(() => {
    setActiveDiscount(data)
  }, [data])
  return (
    <>
      <Button
        block
        borderWidth={1}
        bg="white"
        color={"primary"}
        fontSize={11}
        py={13}
        borderColor="grey"
        justifyContent="flex-start"
        onPress={() => setVisible(!visible)}
      >
        Voucher
      </Button>
      <Modal
        roundedTop={40}
        useNativeDriver
        isVisible={visible}
        onBackdropPress={hideModal}
        animationIn={"slideInUp"}
        onBackButtonPress={hideModal}
        onDismiss={hideModal}
        onModalHide={hideModal}
        h="80%"
      >
        <Div p={20}>
          <Text color="font" fontSize={12}>
            Create a Voucher
          </Text>
          <Text mt={10} color="text">
            Voucher Code
          </Text>
          <Input
            my={10}
            borderColor={COLOR_DISABLED}
            placeholder="ex. MZRT007"
            focusBorderColor="primary"
            value={voucherCode}
            onChangeText={(val) => {
              setVoucherCode(val)
            }}
          />
          <Text my={10} color="text">
            Voucher Value
          </Text>
          <CurrencyInput
            value={voucherValue}
            returnKeyType={"done"}
            placeholder="ex. Rp. 100.000"
            placeholderTextColor={"#c4c4c4"}
            onChangeValue={(val) =>
              !!val ? setVoucherValue(val) : setVoucherValue(0)
            }
            prefix="Rp."
            delimiter="."
            separator=","
            precision={0}
            style={[s.bgWhite, s.p10, borderStyle]}
          />
          <Button
            disabled={
              voucherValue === null || voucherCode === "" ? true : false
            }
            my={15}
            bg="primary"
            onPress={async () => {
              await setData(
                data.concat({
                  id: voucherCode,
                  value: voucherValue,
                }),
              )
              setVoucherValue(null)
              setVoucherCode(null)
            }}
          >
            Add Voucher
          </Button>
          <FlatList
            data={data}
            renderItem={({ item, index }) => (
              <Div
                justifyContent="space-between"
                row
                bg="white"
                borderStyle="dashed"
                borderWidth={1}
                borderColor="primary"
                p={10}
                rounded={6}
                mb={10}
              >
                <Div>
                  <Text fontWeight="bold">{item.id}</Text>
                  <Text>{formatCurrency(item.value || 0)}</Text>
                </Div>
                <Button
                  bg="white"
                  onPress={() => {
                    setData(data.filter((data) => data?.id !== item.id))
                  }}
                >
                  <Icon name="close" color="grey" fontSize={16} />
                </Button>
              </Div>
            )}
            keyExtractor={(_, idx: number) => idx.toString()}
          />
        </Div>
      </Modal>
    </>
  )
}
