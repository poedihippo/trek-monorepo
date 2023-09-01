import { useNavigation } from '@react-navigation/native'
import useQuotations from 'api/hooks/target/sub/useQuotations'
import { formatCurrency, responsive } from 'helper'
import useMultipleQueries from 'hooks/useMultipleQueries'
import moment from 'moment'
import React from 'react'
import { Pressable, TouchableOpacity } from 'react-native'
import { Div, Icon, Skeleton, Text, Tooltip } from 'react-native-magnus'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'

const QuotationComponent = ({tipQuotation, start,end, onPress}) => {
    const {
        queries: [{ data: dataDeals }],
        meta: { isLoading, isFetching, refetch },
      } = useMultipleQueries([useQuotations({
        start_date: !!start ? moment(start).format("YYYY-MM-DD") : "",
        end_date: !!end ? moment(end).format("YYYY-MM-DD") : "",
      })] as const)
      const data = dataDeals?.data
  return (
    <Pressable onPress={onPress}>
    <Div
    style={{
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,

      elevation: 3,
    }}
    w={widthPercentageToDP(46)}
    rounded={4}
    px={5}
    mx={5}
    h={heightPercentageToDP(11)}
    bg="#17519D"
    justifyContent="center"
  >
    <Div row>
      <Text
        allowFontScaling={false}
        fontSize={responsive(10)}
        color="white"
      >
        Quotation
      </Text>
      <TouchableOpacity
        onPress={() => {
          if (tipQuotation.current) {
            tipQuotation.current.show()
          }
        }}
      >
        <Icon
          ml={5}
          name="info"
          color="grey"
          fontFamily="Feather"
          fontSize={12}
        />
      </TouchableOpacity>
      <Tooltip
        ref={tipQuotation}
        mr={widthPercentageToDP(10)}
        text={`Jumlah nominal quotation yang sudah dibuat`}
      />
    </Div>
    <Div row>
      <Text
        allowFontScaling={false}
        fontSize={responsive(10)}
        fontWeight="bold"
        color="white"
      >
        {isLoading === true ? (
          <Skeleton.Box
            h={heightPercentageToDP(2.5)}
            w={widthPercentageToDP(40)}
          />
        ) : !!data?.quotation?.value ? (
          formatCurrency(data?.quotation?.value)
        ) : (
          formatCurrency(0)
        )}
      </Text>
      <Icon
        ml={3}
        name={
          data?.quotation?.value < data?.quotation?.compare
            ? "caretdown"
            : "caretup"
        }
        fontFamily="AntDesign"
        fontSize={8}
        color={
          data?.quotation?.value < data?.quotation?.compare
            ? "#F44336"
            : "#2DCC70"
        }
      />
    </Div>
    {/* <Progress.Bar
      borderRadius={0}
      progress={0.6}
      color="#FFFFFF"
      borderWidth={0}
      height={3}
      useNativeDriver
      unfilledColor="#c4c4c4"
      width={widthPercentageToDP(40)}
      style={{ marginBottom: 5 }}
    />
    <Text fontSize={10} color="white">
      Target {formatCurrency(950000)}
    </Text> */}
  </Div>
    </Pressable>
  )
}

export default QuotationComponent