import React, { useState } from "react"
import { Button, Div, Text } from "react-native-magnus"

import { Select } from "components/Select"

import useMultipleQueries from "hooks/useMultipleQueries"

import useCustomerBrandList from "api/hooks/customer/useCustomerBrandList"

import { COLOR_DISABLED, COLOR_PLACEHOLDER } from "helper/theme"

type PropTypes = {
  leadId: number
  onSelect: (value) => void
  value: any
}

const LeadBrand = ({ leadId, onSelect, value }: PropTypes) => {
  const [visible, setVisible] = useState(false)
  const {
    queries: [{ data: brandList }],
    meta: { isLoading },
  } = useMultipleQueries([useCustomerBrandList(leadId)])
  const renderText = () => {
    if (value.length > 1) {
      return "Multiple Brand selected"
    }
    return "Click to select a Brand"
  }
  return (
    <>
      <Button
        flex={1}
        block
        borderWidth={1}
        bg="white"
        color={value ? "primary" : COLOR_PLACEHOLDER}
        fontSize={11}
        py={13}
        borderColor="grey"
        justifyContent="flex-start"
        onPress={() => setVisible(!visible)}
        disabled={false}
      >
        {renderText()}
      </Button>
      <Select
        multiple={true}
        visible={visible}
        setVisible={setVisible}
        onSelect={onSelect}
        value={value}
        title="Available Brand List"
        data={brandList?.data || []}
        keyExtractor={(item, index) => `user${item.id}`}
        renderItem={(item, index) => (
          <Select.Option
            value={item?.id?.toString()}
            p={20}
            borderBottomWidth={0.8}
            borderBottomColor={COLOR_DISABLED}
          >
            <Div row>
              <Text>{item.name}</Text>
            </Div>
          </Select.Option>
        )}
      />
    </>
  )
}

export default LeadBrand
