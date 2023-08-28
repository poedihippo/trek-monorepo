import { useNavigation } from "@react-navigation/native"
import Case from "case"
import React, { useEffect } from "react"
import { FlatList, Pressable, TouchableOpacity } from "react-native"
import { Button, Div, Icon, ScrollDiv, Text } from "react-native-magnus"
import {
  heightPercentageToDP
} from "react-native-responsive-screen"

import Loading from "components/Loading"

import useMultipleQueries from "hooks/useMultipleQueries"

import { useAuth } from "providers/Auth"

import useActivityList from "api/hooks/activity/useActivityList"
import useUserLoggedInData from "api/hooks/user/useUserLoggedInData"

import {
  formatDateOnly,
  formatTimeOnly,
  hexColorFromString,
  responsive,
} from "helper"
import { dataFromPaginated } from "helper/pagination"
import s, { COLOR_PRIMARY } from "helper/theme"

import { Activity } from "types/Activity"
import { getFullName } from "types/Customer"

const Profile = () => {
  const {
    queries: [{ data: userData }, { data: activityPaginatedData }],
    meta: { isError, isLoading, isFetching },
  } = useMultipleQueries([useUserLoggedInData(), useActivityList({})] as const)
  const navigation = useNavigation()
  const { onLogout } = useAuth()
  const Activity: Activity[] = dataFromPaginated(activityPaginatedData)

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => {
            navigation.navigate("UserSelectChannel")
          }}
        >
          <Icon
            name="exchange"
            color="white"
            fontSize={16}
            fontFamily="FontAwesome"
            mr={10}
          />
        </Pressable>
      ),
    })
  }, [navigation])
  const renderItem = (item) => {
    let body

    const id = item?.id
    const user = Case.title(item?.user?.name)

    if (item.followUpMethod === "WALK_IN_CUSTOMER") {
      body = (
        <Text>
          <Text fontWeight="bold">{user}</Text> followed up{" "}
          <Text fontWeight="bold">{getFullName(item?.customer)}</Text> in store.
        </Text>
      )
    } else if (item.followUpMethod === "NEW_ORDER") {
      body = (
        <Text>
          <Text fontWeight="bold">{user}</Text> made a new order for{" "}
          <Text fontWeight="bold">{getFullName(item?.customer)}</Text>.
        </Text>
      )
    } else if (item.followUpMethod === "OTHERS") {
      body = (
        <Text>
          <Text fontWeight="bold">{user}</Text> followed up{" "}
          <Text fontWeight="bold">{getFullName(item?.customer)}</Text>.
        </Text>
      )
    } else {
      body = (
        <Text>
          <Text fontWeight="bold">{item?.user?.name}</Text> followed up{" "}
          <Text fontWeight="bold">{getFullName(item?.customer)}</Text> by{" "}
          <Text fontWeight="bold">{Case.title(item?.followUpMethod)}</Text>.
        </Text>
      )
    }

    return (
      <Pressable onPress={() => navigation.navigate("ActivityDetail", { id })}>
        <Div
          bg="#E6F0FF"
          p={5}
          rounded={4}
          alignItems="flex-start"
          justifyContent="space-between"
          mb={10}
        >
          <Div maxW="70%" row mr={10}>
            <Icon
              name="circle"
              color={`#${hexColorFromString(item?.user?.name)}`}
              fontSize={responsive(10)}
              fontFamily="FontAwesome"
              mr={10}
            />
            <Div>
              <Div maxW="70%" row>
                <Text fontSize={10} color="disabled">
                  {formatDateOnly(item?.followUpDatetime)}
                </Text>
                <Text fontSize={10} ml={10} color="disabled">
                  {formatTimeOnly(item?.followUpDatetime)}
                </Text>
              </Div>
              {body}
            </Div>
          </Div>
        </Div>
      </Pressable>
    )
  }
  return (
    <ScrollDiv flex={1} bg="white">
      <Div alignItems="center" mt={heightPercentageToDP(3)}>
        <Div
          w={70}
          h={70}
          rounded={70 / 2}
          bg="#A6ABBD"
          alignItems="center"
          justifyContent="center"
        >
          <Text fontSize={responsive(14)} fontWeight="bold" color="white">
            {userData.initial}
          </Text>
        </Div>
        <Text fontSize={responsive(12)} my={5}>
          {userData.name}
        </Text>
        <Text fontSize={responsive(10)} color="#c4c4c4">
          {userData.email}
        </Text>
      </Div>
      <Div bg="primary" mx={10} rounded={9} mt={heightPercentageToDP(3)}>
        <Div justifyContent="space-between" row p={10}>
          <Text color="white">Roles</Text>
          <Text color="white">{userData.type}</Text>
        </Div>
        {/* <Div justifyContent="space-between" row p={10}>
          <Text color="white">Company</Text>
          <Text color="white">{userData.company.name.toUpperCase()}</Text>
        </Div> */}
      </Div>
      {userData.type === "SALES" ? null : (
        <Button
          mx={10}
          mt={heightPercentageToDP(1)}
          block
          color="#fff"
          bg={COLOR_PRIMARY}
          fontWeight="500"
          fontSize={responsive(10)}
          mr={10}
          onPress={() => navigation.navigate("DiscountApproval")}
        >
          Discount Approval
        </Button>
      )}
      <Div>
        <FlatList
          scrollEnabled={false}
          ListHeaderComponent={() => (
            <Div row justifyContent="space-between">
              <Text fontWeight="bold" fontSize={12} mb={5}>
                Recent Activity
              </Text>
              <Pressable onPress={() => navigation.navigate("SalesActivity")}>
                <Text fontWeight="bold" color="primary" fontSize={12} mb={5}>
                  See all
                </Text>
              </Pressable>
            </Div>
          )}
          contentContainerStyle={[
            {
              flexGrow: 1,
              marginHorizontal: 10,
              borderRadius: 8,
              marginVertical: 10,
            },
            s.p20,
            s.bgWhite,
          ]}
          data={Activity?.slice(0, 4)}
          keyExtractor={({ id }) => `salesActivity${id}`}
          showsVerticalScrollIndicator={false}
          bounces={false}
          ListEmptyComponent={() =>
            !!isLoading ? (
              <Loading />
            ) : (
              <Text fontSize={14} textAlign="center" p={20}>
                Kosong
              </Text>
            )
          }
          renderItem={({ item, index }) => renderItem(item)}
        />
      </Div>
      <Div flex={1} justifyContent="flex-end">
        <TouchableOpacity
          style={{
            backgroundColor: "#A6ABBD",
            marginHorizontal: 20,
            padding: 8,
            borderRadius: 8,
            marginBottom: 10,
          }}
          onPress={() => {
            onLogout()
          }}
        >
          <Text
            allowFontScaling={false}
            color="white"
            fontSize={14}
            textAlign="center"
          >
            Logout
          </Text>
        </TouchableOpacity>
        <Text textAlign="center" color="#c4c4c4">
          Version 1.0.0
        </Text>
      </Div>
    </ScrollDiv>
  )
}

export default Profile
