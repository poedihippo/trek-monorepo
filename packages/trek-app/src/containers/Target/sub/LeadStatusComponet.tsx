import {  FlatList, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { responsive } from 'helper'
import { Div, Icon, Tooltip, Text } from 'react-native-magnus'
import { widthPercentageToDP } from 'react-native-responsive-screen'

const LeadStatusComponet = ({tipLeadStatus,status}) => {
    const newRenderStatus = ({ item }) => (
        <Div
          bg="white"
          rounded={8}
        >
          <Div row my={5} alignItems='center' justifyContent='space-between'>
            <Div alignItems='center' row>
            <Div  bg={item.color} p={15} rounded={6}>
            <Icon
              name={
                item.status === "Hot"
                  ? "fire"
                  : item.status === "Warm"
                  ? "air"
                  : item.status === "Cold"
                  ? "snowflake"
                  : null
              }
              fontFamily={
                item.status === "Hot"
                  ? "FontAwesome5"
                  : item.status === "Warm"
                  ? "Entypo"
                  : item.status === "Cold"
                  ? "FontAwesome5"
                  : null
              }
              color={'white'}
              fontSize={16}
            />
            </Div>
            <Text  ml={10} allowFontScaling={false} fontSize={12} color={item.color}>
              {item.status}
            </Text>
            </Div>
            <Text
              allowFontScaling={false}
              fontSize={12}
              color={item.color}
              fontWeight="bold"
            >
              {!!item.total ? item.total : "0"}
            </Text>
          </Div>
          {item.status === 'Cold' ? null : (
          <View style={[{ height: 1, overflow: 'hidden', marginVertical: 5 }]}>
            <View style={[{ height: 2, borderWidth: 1, borderColor: '#979797', borderStyle: 'dashed' }]}></View>
            </View>
          )}
        </Div>
      )
  return (
    <Div
            mx={10}
            p={8}
            mt={5}
            bg="white"
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
            <Div>
              <Div row>
                <Text
                  ml={5}
                  allowFontScaling={false}
                  fontSize={12}
                  color="primary"
                >
                  Lead Status
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    if (tipLeadStatus.current) {
                      tipLeadStatus.current.show()
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
                  ref={tipLeadStatus}
                  mr={widthPercentageToDP(10)}
                  text={`Jumlah Leads berdasarkan status COLD, WARM, dan HOT`}
                />
              </Div>
              <Div my={8}>
                <FlatList
                  data={status}
                  contentContainerStyle={{ padding: 5 }}
                  renderItem={newRenderStatus}
                />
              </Div>
            </Div>
          </Div>
  )
}

export default LeadStatusComponet