import React from "react"
import { Div, Text } from "react-native-magnus"
import { heightPercentageToDP } from "react-native-responsive-screen"

import { responsive } from "helper"
import { COLOR_PRIMARY } from "helper/theme"

const Stocks = () => {
  return (
    <Div bg={"#fff"} m={10} rounded={10}>
      <Div p={10}>
        <Text fontSize={responsive(18)} fontWeight="500">
          Alba Store
        </Text>
        <Div
          h={heightPercentageToDP(0.1)}
          bg="#c4c4c4"
          mt={heightPercentageToDP(0.5)}
          mb={heightPercentageToDP(0.5)}
        />
        <Text color={COLOR_PRIMARY} fontSize={responsive(10)} fontWeight="bold">
          Available Stock: 2
        </Text>
        <Div
          h={heightPercentageToDP(0.1)}
          bg="#c4c4c4"
          mt={heightPercentageToDP(0.5)}
          mb={heightPercentageToDP(0.5)}
        />
        <Text>WAREHOUSE NORMAL WH</Text>
        <Text>Id: AL001</Text>
        <Text>Stock: 2</Text>
      </Div>
    </Div>
  )
}

export default Stocks
