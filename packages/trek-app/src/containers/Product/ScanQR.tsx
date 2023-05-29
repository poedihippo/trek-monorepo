import React from "react"
import { Button, Icon } from "react-native-magnus"

import Text from "components/Text"

import { responsive } from "helper"
import { COLOR_DISABLED } from "helper/theme"

export default ({ navigate }) => {
  return (
    <Button
      flex={1}
      p={10}
      mr={10}
      bg="white"
      borderWidth={1}
      borderColor={COLOR_DISABLED}
      onPress={navigate}
      prefix={
        <Icon
          name="API"
          color="black"
          fontSize={responsive(18)}
          fontFamily="AntDesign"
          mr={10}
        />
      }
    >
      <Text fontSize={14} fontWeight="bold">
        Model
      </Text>
    </Button>
  )
}
