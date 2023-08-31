/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigation, useRoute } from "@react-navigation/native"
import moment from "moment"
import React, { useEffect, useState } from "react"
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native"
import { Button, Div, Text } from "react-native-magnus"
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen"
import { useQuery } from "react-query"

import Loading from "components/Loading"

import { useAxios } from "hooks/useApi"

import { useAuth } from "providers/Auth"

import { formatCurrency } from "helper"

const TopSales = () => {
  const { loggedIn } = useAuth()
  const navigation = useNavigation()
  const route = useRoute()
  const params = route.params
  console.log(params, "check params")
  const axios = useAxios()
  const [topsales, setTopSales] = useState([])
  const [categorySales, setCategorySales] = useState("target")
  const [loading, setLoading] = useState(false)
  const topSales = useQuery<string, any>(["topsalesdetail", loggedIn], () => {
    setLoading(true)
    return axios
      .get(
        `dashboard/top-sales/${categorySales}?limit=50&start_at=${moment(
          params?.startDate,
        ).format("YYYY-MM-DD")}&end_at=${moment(params?.endDate)
          .endOf("month")
          .format("YYYY-MM-DD")}&type=${params?.type}`,
      )
      .then((res) => {
        setTopSales(res.data)
      })
      .catch((error) => {
        if (error) {
          console.log(error.response)
        }
      })
      .finally(() => {
        setLoading(false)
      })
  })

  const dummyData = [
    {
      priority: 1,
      model: {
        name: "Jesse Pinkman",
      },
      percentage: 20,
      value: 15000,
    },
    {
      priority: 2,
      model: {
        name: "White walker",
      },
      percentage: 15,
      value: 12000,
    },
    {
      priority: 3,
      model: {
        name: "Aldi",
      },
      percentage: 10,
      value: 8000,
    },
    {
      priority: 4,
      model: {
        name: "David",
      },
      percentage: 25,
      value: 18000,
    },
    {
      priority: 5,
      model: {
        name: "Eva",
      },
      percentage: 12,
      value: 10000,
    },
    {
      priority: 6,
      model: {
        name: "Frank",
      },
      percentage: 18,
      value: 13500,
    },
    {
      priority: 7,
      model: {
        name: "Grace",
      },
      percentage: 22,
      value: 16500,
    },
    {
      priority: 8,
      model: {
        name: "Hannah",
      },
      percentage: 17,
      value: 13000,
    },
    {
      priority: 9,
      model: {
        name: "Ivy",
      },
      percentage: 14,
      value: 10500,
    },
    {
      priority: 10,
      model: {
        name: "Jack",
      },
      percentage: 30,
      value: 22000,
    },
  ]

  useEffect(() => {
    topSales.refetch()
  }, [categorySales])

  if (loading === true) {
    return <Loading />
  }
  const renderTopSales = ({ item }) => (
    <>
      {categorySales === "target" ? (
        <TouchableOpacity
        // onPress={() =>
        //   params?.type === "sales"
        //     ? undefined
        //     : navigation.navigate("TopSalesDetail", {
        //         id: item.model_id,
        //         type: params.type,
        //         startDate: params?.startDate,
        //         endDate: params?.endDate,
        //       })
        // }
        >
          <Div
            py={14}
            bg="white"
            row
            borderBottomWidth={1}
            borderBottomColor="#c4c4c4"
          >
            <Div flex={1.5}>
              <Text fontWeight="normal" textAlign="center">
                {item.priority}
              </Text>
            </Div>
            <Div flex={4}>
              <Text fontWeight="normal" textAlign="center">
                {item?.model?.name}
              </Text>
            </Div>
            <Div flex={3}>
              <Text fontWeight="normal" textAlign="center">
                {item.percentage}%
              </Text>
            </Div>
            <Div flex={3}>
              <Text fontWeight="normal" textAlign="center">
                {formatCurrency(item.value)}
              </Text>
            </Div>
          </Div>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
        // onPress={() =>
        //   navigation.navigate("TopSalesDetail", {
        //     id: item.model_id,
        //     type: params.type,
        //     startDate: params?.startDate,
        //     endDate: params?.endDate,
        //   })
        // }
        >
          <Div
            py={14}
            bg="white"
            row
            borderBottomWidth={1}
            borderBottomColor="#c4c4c4"
          >
            <Div flex={1}>
              <Text fontWeight="normal" textAlign="center">
                {item?.priority}
              </Text>
            </Div>
            <Div flex={4}>
              <Text fontWeight="normal" textAlign="center">
                {item?.model?.name}
              </Text>
            </Div>
            <Div flex={3}>
              <Text fontWeight="normal" textAlign="center">
                {formatCurrency(item?.value)}
              </Text>
            </Div>
          </Div>
        </TouchableOpacity>
      )}
    </>
  )
  return (
    <Div bg="white" flex={1}>
      <Div row justifyContent="space-between" p={15}>
        <Text fontWeight="bold" fontSize={16}>
          Top {params?.type}
        </Text>
        <Div row alignSelf="center">
          <Button
            onPress={() => setCategorySales("value")}
            bg="white"
            borderWidth={2}
            mx={5}
            borderColor={categorySales === "value" ? "#17949D" : "grey"}
            color={categorySales === "value" ? "#17949D" : "grey"}
            underlayColor="red100"
          >
            Value
          </Button>
          <Button
            onPress={() => setCategorySales("target")}
            bg="white"
            borderWidth={2}
            borderColor={categorySales === "value" ? "grey" : "#17949D"}
            color={categorySales === "value" ? "grey" : "#17949D"}
            underlayColor="red100"
          >
            Target
          </Button>
        </Div>
      </Div>
      <View style={styles.content}>
        <FlatList
          renderItem={renderTopSales}
          data={dummyData}
          ListHeaderComponent={
            categorySales === "target" ? (
              <Div py={14} row bg="#17949D">
                <Div flex={1.5}>
                  <Text color="white" fontWeight="bold" textAlign="center">
                    No.
                  </Text>
                </Div>
                <Div flex={4}>
                  <Text color="white" fontWeight="bold" textAlign="center">
                    {params?.type} Name
                  </Text>
                </Div>
                <Div flex={3}>
                  <Text color="white" fontWeight="bold" textAlign="center">
                    Meet Goal
                  </Text>
                </Div>
                <Div flex={3}>
                  <Text color="white" fontWeight="bold" textAlign="center">
                    Revenue
                  </Text>
                </Div>
              </Div>
            ) : (
              <Div py={14} row bg="#17949D">
                <Div flex={1}>
                  <Text color="white" fontWeight="bold" textAlign="center">
                    No.
                  </Text>
                </Div>
                <Div flex={4}>
                  <Text color="white" fontWeight="bold" textAlign="center">
                    {params?.type} Name
                  </Text>
                </Div>
                <Div flex={3}>
                  <Text color="white" fontWeight="bold" textAlign="center">
                    Revenue
                  </Text>
                </Div>
              </Div>
            )
          }
        />
      </View>
    </Div>
  )
}

export default TopSales

const styles = StyleSheet.create({
  content: {
    height: heightPercentageToDP(70),
    marginTop: heightPercentageToDP(2),
  },
})
