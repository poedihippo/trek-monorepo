import { Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import { Div, Icon, Skeleton, Tooltip, Text } from 'react-native-magnus'
import { responsive, formatCurrency } from 'helper'
import moment from 'moment'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { useNavigation } from '@react-navigation/native'
import * as Progress from "react-native-progress"
import useMultipleQueries from 'hooks/useMultipleQueries'
import useDeals from 'api/hooks/target/sub/useDeals'

const DealComponent = ({userData, start,end, tipDeal}) => {
    const navigation = useNavigation()
    const {
        queries: [{ data: dataDeals }],
        meta: { isLoading, isFetching, refetch },
      } = useMultipleQueries([useDeals({
        start_date: !!start ? moment(start).format("YYYY-MM-DD") : "",
        end_date: !!end ? moment(end).format("YYYY-MM-DD") : "",
      })] as const)
      const data = dataDeals?.data
  return (
    <Div>
    <Pressable
      onPress={() =>
        navigation.navigate("QuotationInside", {
          type: userData?.type,
          id: userData?.id,
          name: userData?.name,
          invoice_type: "deals",
          startDate: !!start ? start : moment().startOf("month"),
          endDate: !!end ? end : moment().endOf("month"),
        })
      }
    >
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
        row
        rounded={4}
        p={8}
        mx={10}
        h={heightPercentageToDP(18.5)}
        bg="#1746A2"
      >
        <Div justifyContent="center">
          <Progress.Circle
            unfilledColor="white"
            fill="transparent"
            borderWidth={0}
            size={100}
            progress={
              data?.deals?.value / data?.deals?.target_deals ===
                Infinity ||
              isNaN(data?.deals?.value / data?.deals?.target_deals)
                ? 0
                : data?.deals?.value / data?.deals?.target_deals
            }
            animated={false}
            thickness={8}
            showsText={true}
            color={"white"}
          />
        </Div>

        <Div ml={heightPercentageToDP(3)}>
          <Div row alignItems="center" mt={10}>
            <Text
              allowFontScaling={false}
              fontSize={responsive(10)}
              color="white"
            >
              Deal
            </Text>
            <TouchableOpacity
              onPress={() => {
                if (tipDeal.current) {
                  tipDeal.current.show()
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
              ref={tipDeal}
              mr={widthPercentageToDP(10)}
              text={`Jumlah total pencapaian anda`}
            />
          </Div>
          <Div row>
            <Text
              allowFontScaling={false}
              fontSize={responsive(12)}
              fontWeight="bold"
              color="white"
            >
              {isLoading === true ? (
                <Skeleton.Box
                  w={widthPercentageToDP(20)}
                  h={heightPercentageToDP(3)}
                />
              ) : (
                formatCurrency(data?.deals?.value)
              )}
            </Text>
            <Icon
              ml={3}
              name={
                data?.deals?.value < data?.deals?.compare
                  ? "caretdown"
                  : "caretup"
              }
              fontFamily="AntDesign"
              fontSize={8}
              color={
                data?.deals?.value < data?.deals?.compare
                  ? "#F44336"
                  : "#2DCC70"
              }
            />
          </Div>
          <Text
            allowFontScaling={false}
            fontSize={responsive(10)}
            // my={7}
            color="#c4c4c4"
          >
            Target
          </Text>
          <Text
            allowFontScaling={false}
            fontSize={responsive(10)}
            // my={7}
            color="#c4c4c4"
          >
            {isLoading === true ? (
              <Skeleton.Box
                h={heightPercentageToDP(1)}
                w={widthPercentageToDP(40)}
              />
            ) : !!data?.deals?.target_deals ? (
              formatCurrency(data?.deals?.target_deals)
            ) : (
              formatCurrency(0)
            )}
          </Text>
        </Div>
      </Div>
    </Pressable>
  </Div>

  )
}

export default DealComponent