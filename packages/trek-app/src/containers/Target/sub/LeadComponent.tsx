import { Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import { isLoading } from 'expo-font'
import { responsive } from 'helper'
import moment from 'moment'
import { Div, Icon, Tooltip, Skeleton, Text } from 'react-native-magnus'
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen'
import * as Progress from "react-native-progress"
import { useNavigation } from '@react-navigation/native'

const LeadComponent = ({userData,start,end,tipLead,data,isLoading, tipActiveLead, tooltipRef,onPress, onActiveLeadPress}) => {
    const navigation = useNavigation()
  return (
    <Div row mt={8}  justifyContent='space-between'>
    <Div>
      <Pressable
        onPress={onPress}
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
          rounded={4}
          p={5}
          bg="#FF731D"
        >
          <Div row justifyContent="space-between">
            <Text
              allowFontScaling={false}
              fontSize={responsive(10)}
              color="white"
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
            <Tooltip
              ref={tipLead}
              mr={widthPercentageToDP(10)}
              text={`Jumlah lead baru anda pada bulan ini`}
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
                  w={widthPercentageToDP(10)}
                />
              ) : !!data?.new_leads?.value ? (
                data?.new_leads?.value
              ) : (
                "0"
              )}
            </Text>
            <Icon
              ml={3}
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
          <Div row w={widthPercentageToDP(40)}> 
            <Div>
              <Progress.Bar
                borderRadius={0}
                color="#FFFFFF"
                borderWidth={0}
                height={3}
                useNativeDriver
                unfilledColor="#c4c4c4"
                width={widthPercentageToDP(25)}
                style={{ marginTop: 5 }}
                progress={
                  data?.new_leads?.value /
                    data?.new_leads?.target_leads ===
                    Infinity ||
                  isNaN(
                    data?.new_leads?.value /
                      data?.new_leads?.target_leads,
                  )
                    ? 0
                    : data?.new_leads?.value /
                      data?.new_leads?.target_leads
                }
              />
            </Div>
          </Div>
          <Text
            fontSize={responsive(10)}
            color="white"
            allowFontScaling={false}
          >
            Target{" "}
            {!!data?.new_leads?.target_leads
              ? data?.new_leads?.target_leads
              : "0"}
          </Text>
        </Div>
      </Pressable>
      <Pressable
        onPress={onActiveLeadPress}
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
          rounded={4}
          p={5}
          px={10}
       
          h={heightPercentageToDP(6)}
          mt={heightPercentageToDP(0.5)}
          bg="white"
        >
          <Div>
            <Div row>
              <Text
                allowFontScaling={false}
                fontSize={responsive(9)}
                color="#979797"
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
              color="#5F9DF7"
            >
              {!!data?.active_leads?.value
                ? data?.active_leads?.value
                : "0"}
            </Text>
          </Div>
        </Div>
      </Pressable>
    </Div>
    <Div
      bg="#fff"
      overflow='hidden'
      w={widthPercentageToDP(50)}
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
      <Div row>
        <Text
          allowFontScaling={false}
          fontSize={responsive(10)}
          color="text"
        >
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
      <Div row alignItems="center">
        <Text
          allowFontScaling={false}
          fontSize={responsive(12)}
          my={5}
          fontWeight="bold"
          color="#5F9DF7"
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
      <Progress.Bar
        borderRadius={0}
        progress={
          data?.follow_up?.total_activities?.value /
            data?.follow_up?.total_activities?.target_activities ===
            Infinity ||
          isNaN(
            data?.follow_up?.total_activities?.value /
              data?.follow_up?.total_activities?.target_activities,
          )
            ? 0
            : data?.follow_up?.total_activities?.value /
              data?.follow_up?.total_activities?.target_activities
        }
        color="#5F9DF7"
        borderWidth={0}
        height={5}
        useNativeDriver
        unfilledColor="#c4c4c4"
        width={widthPercentageToDP(40)}
      />
      {/* <Text my={5} fontSize={responsive(8)} color="#c4c4c4">
        Target {data?.follow_up?.total_activities?.target_activities}{" "}
        {`(${Math.round(
          (data?.follow_up?.total_activities?.value /
            data?.follow_up?.total_activities?.target_activities) *
            100,
        )}%)`}
      </Text> */}
      <Text my={5} fontSize={responsive(8)} color="#c4c4c4">
        Target{" "}
        {!!data?.follow_up?.total_activities?.target_activities
          ? data?.follow_up?.total_activities?.target_activities
          : "0"}{" "}
        (0%)
      </Text>
    </Div>
  </Div>

  )
}

export default LeadComponent