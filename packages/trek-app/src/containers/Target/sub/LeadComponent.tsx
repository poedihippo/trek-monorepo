import { useNavigation } from "@react-navigation/native"
import { isLoading } from "expo-font"
import moment from "moment"
import React from "react"
import { Pressable, TouchableOpacity, View } from "react-native"
import { Div, Icon, Tooltip, Skeleton, Text } from "react-native-magnus"
import * as Progress from "react-native-progress"
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen"

import { responsive } from "helper"

const LeadComponent = ({
  userData,
  start,
  end,
  tipLead,
  data,
  isLoading,
  tipActiveLead,
  tooltipRef,
  onPress,
  onActiveLeadPress,
}) => {
  const navigation = useNavigation()
  return (
    <Div mt={8} justifyContent="space-between">
      <Div >
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
            rounded={4}
            p={10}
            bg="white"
          >
            <Pressable onPress={onPress}>
            <Div bg="white" row alignItems="center" justifyContent='space-between'>
              <Div py={5} row alignItems="center">
              <Text
                allowFontScaling={false}
                fontSize={responsive(10)}
                color="primary"
              >
                New Leads
              </Text>
              <TouchableOpacity
                onPress={() => {
                  if (tipLead.current) {
                    tipLead.current.show()
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
              </Div>
              <Tooltip
                ref={tipLead}
                mr={widthPercentageToDP(10)}
                text={`Jumlah lead baru anda pada bulan ini`}
              />
              <Div>
            <Div row  justifyContent='flex-end' alignItems="center">
              <Text
                allowFontScaling={false}
                fontSize={responsive(10)}
                fontWeight="bold"
                color="primary"
              >
                {isLoading === true ? (
                  <Skeleton.Box
                    h={heightPercentageToDP(2.5)}
                    w={widthPercentageToDP(10)}
                  />
                ) : !!data?.new_leads?.value ? (
                  data?.new_leads?.value
                ) : (
                  "0"
                )}
              </Text>
              <Icon
                name={
                  data?.new_leads?.value < data?.new_leads?.compare
                    ? "caretdown"
                    : "caretup"
                }
                fontFamily="AntDesign"
                fontSize={8}
                color={
                  data?.new_leads?.value < data?.new_leads?.compare
                    ? "#F44336"
                    : "#2DCC70"
                }
              />
            </Div>
            <Text
         fontSize={responsive(8)} color="#c4c4c4"
              allowFontScaling={false}
            >
              Target{" "}
              {!!data?.new_leads?.target_leads
                ? data?.new_leads?.target_leads
                : "0"}
            </Text>
              </Div>
            </Div>
            </Pressable>   
            <View style={[{ height: 1, overflow: 'hidden', marginVertical: 10 }]}>
            <View style={[{ height: 2, borderWidth: 1, borderColor: '#979797', borderStyle: 'dashed' }]}></View>
            </View>
        <Pressable onPress={onActiveLeadPress}>
          <Div
            mt={heightPercentageToDP(0.5)}
            bg="white"
          >
            <Div py={5} row justifyContent='space-between'>
              <Div row>
                <Text
                  allowFontScaling={false}
                  fontSize={responsive(9)}
                  color="primary"
                >
                  Active Leads
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    if (tipActiveLead.current) {
                      tipActiveLead.current.show()
                    }
                  }}
                >
                  <Icon
                    ml={5}
                    name="info"
                    color="#c4c4c4"
                    fontFamily="Feather"
                    fontSize={12}
                  />
                </TouchableOpacity>
                <Tooltip
                  ref={tipActiveLead}
                  mr={widthPercentageToDP(10)}
                  text={`Jumlah total active lead`}
                />
              </Div>
              <Text
                allowFontScaling={false}
                fontSize={responsive(10)}
                fontWeight="bold"
                color="primary"
              >
                {!!data?.active_leads?.value ? data?.active_leads?.value : "0"}
              </Text>
            </Div>
          </Div>
        </Pressable>
          </Div>
      
      </Div>
      <Div
        mt={8}
        bg="#fff"
        overflow="hidden"
        p={8}
        rounded={6}
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
      >
        <Div row justifyContent='space-between' mx={5}>
          <Div row alignItems="center">
          <Text allowFontScaling={false} fontSize={responsive(10)} color="primary">
            Follow Up
          </Text>
          <TouchableOpacity
            onPress={() => {
              if (tooltipRef.current) {
                tooltipRef.current.show()
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
            ref={tooltipRef}
            mr={widthPercentageToDP(10)}
            text={`Jumlah Follow up yang dilakukan ke customer`}
          />
          </Div>
        <Div alignItems='flex-end'>
        <Div row bg="white">
          <Text
            allowFontScaling={false}
            fontSize={12}
            my={5}
            fontWeight="bold"
            color="primary"
          >
            {isLoading === true ? (
              <Skeleton.Box
                h={heightPercentageToDP(2.5)}
                w={widthPercentageToDP(10)}
              />
            ) : !!data?.follow_up?.total_activities?.value ? (
              data?.follow_up?.total_activities?.value
            ) : (
              "0"
            )}
          </Text>
          <Icon
            ml={5}
            name={
              data?.follow_up?.total_activities?.value <
              data?.follow_up?.total_activities?.compare
                ? "caretdown"
                : "caretup"
            }
            fontFamily="AntDesign"
            fontSize={10}
            color={
              data?.follow_up?.total_activities?.value <
              data?.follow_up?.total_activities?.compare
                ? "#F44336"
                : "#2DCC70"
            }
          />
        </Div>
        <Text my={5} fontSize={responsive(8)} color="#c4c4c4">
          Target{" "}
          {!!data?.follow_up?.total_activities?.target_activities
            ? data?.follow_up?.total_activities?.target_activities
            : "0"}{" "}
        </Text>
        </Div>
        </Div>
      </Div>
    </Div>
  )
}

export default LeadComponent
