import React from "react"
import { Button, Icon } from "react-native-magnus"

import Image from "components/Image"
import Text from "components/Text"

import { responsive } from "helper"
import { COLOR_DISABLED } from "helper/theme"

export default ({ navigate }) => {
  return (
    <Button
      flex={1}
      p={10}
      bg="white"
      borderWidth={1}
      borderColor={COLOR_DISABLED}
      prefix={
        <Icon
          name="appstore-o"
          color="black"
          fontSize={responsive(18)}
          fontFamily="AntDesign"
          mr={10}
        />
      }
      onPress={navigate}
    >
      <Text ml={10} fontSize={14} fontWeight="bold">
        Product Search
      </Text>
    </Button>
  )
}
