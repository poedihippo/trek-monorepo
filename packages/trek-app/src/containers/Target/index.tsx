/* eslint-disable custom-rules/api-error-loading-handling */
import { useNavigation } from "@react-navigation/native"
import { LinearGradient } from "expo-linear-gradient"
import moment from "moment"
import React, { useState } from "react"
import {
  Animated,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  TouchableOpacity
} from "react-native"
import {
  Button,
  Div,
  Icon,
  Modal,
  Skeleton,
  Text,
  Tooltip
} from "react-native-magnus"
import {
  heightPercentageToDP,
  widthPercentageToDP
} from "react-native-responsive-screen"

import BotSection from "containers/Dashboard/BotSection"

import DatePickerInput from "components/DatePickerInput"
import SelectChannel from "components/SelectChannel"

import useMultipleQueries from "hooks/useMultipleQueries"

import useTarget from "api/hooks/target/useTarget"
import useSuperstarList from "api/hooks/topSales/useSuperstarList"
import useUserLoggedInData from "api/hooks/user/useUserLoggedInData"

import { formatCurrency, responsive } from "helper"
import { COLOR_PRIMARY } from "helper/theme"

import DealComponent from "./sub/DealComponent"
import LeadComponent from "./sub/LeadComponent"
import QuotationComponent from "./sub/QuotationComponent"
import LeadStatusComponet from "./sub/LeadStatusComponet"

const TargetScreen = () => {
  const tooltipRef = React.createRef(),
    tipDeal = React.createRef(),
    tipLead = React.createRef(),
    tipActiveLead = React.createRef(),
    tipLeadStatus = React.createRef(),
    tipQuotation = React.createRef(),
    tipEstimated = React.createRef()
  const [modalVisible, setModalVisible] = useState(false)
  const [filterVisible, setFilterVisible] = useState(false)
  const [date, setDate] = useState<any>()
  const [start, setStart] = useState<any>()
  const [end, setEnd] = useState<any>()
  const [company, setCompany] = useState<string>("")
  const [channel, setChannel] = useState<string>("")
  const {
    queries: [{ data: userData }],
  } = useMultipleQueries([useUserLoggedInData()] as const)
  const defaultStart = !!start
    ? moment(start).startOf("month").format("YYYY-MM-DD")
    : moment().startOf("month").format("YYYY-MM-DD")
  const defaultEnd = !!end
    ? moment(end).endOf("month").format("YYYY-MM-DD")
    : moment().endOf("month").format("YYYY-MM-DD")

  const {
    queries: [ { data: target }],
    meta: { isLoading, isFetching, refetch },
  } = useMultipleQueries([
    // useSuperstarList("target", "yahaha", defaultStart, defaultEnd),
    useTarget({
      start_date: !!start ? moment(start).format("YYYY-MM-DD") : "",
      end_date: !!end ? moment(end).format("YYYY-MM-DD") : "",
      company_id: company,
      channel_id: channel,
    }),
  ] as const)
  const data = target?.data
  const navigation = useNavigation()
  const status = [
    {
      status: "Hot",
      total: data?.follow_up?.hot_activities,
      color: "#F44336",
    },
    {
      status: "Warm",
      total: data?.follow_up?.warm_activities,
      color: "#FFD13D",
    },
    {
      status: "Cold",
      total: data?.follow_up?.cold_activities,
      color: "#5597FD",
    },
  ]

  const scrollY = React.useRef(new Animated.Value(0)).current
  const FilterTarget = () => {
    return (
      <>
        {userData?.type === "SALES" ? (
          <Div row m={10} alignItems="center">
            <Div flex={1} mr={10}>
              <DatePickerInput
                placeholder="Start Date"
                value={date}
                reset={false}
                onSelect={(val) => setDate(val)}
              />
            </Div>
            <Div flex={1}>
              <DatePickerInput
                placeholder="End Date"
                value={end}
                reset={false}
                onSelect={(val) => {
                  setStart(date)
                  setEnd(val)
                }}
              />
            </Div>
          </Div>
        ) : userData?.type === "SUPERVISOR" ? (
          <Div row mx={10} mb={8} alignItems="center">
            <Div flex={1} mr={10}>
              <DatePickerInput
                placeholder="Start Date"
                value={date}
                reset={false}
                onSelect={(val) => setDate(val)}
              />
            </Div>
            <Div flex={1}>
              <DatePickerInput
                placeholder="End Date"
                value={end}
                reset={false}
                onSelect={(val) => {
                  setStart(date)
                  setEnd(val)
                }}
              />
            </Div>
            <TouchableOpacity
              style={{
                marginLeft: 10,
                padding: 5,
                borderRadius: 8,
                backgroundColor: !!filterVisible ? COLOR_PRIMARY : "",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => setFilterVisible(true)}
            >
              <Icon name="filter" fontFamily="Ionicons" fontSize={30} />
            </TouchableOpacity>
          </Div>
        ) : userData?.type === "DIRECTOR" ? (
          <Div row mx={10} mb={8} alignItems="center">
            <Div flex={1} mr={10}>
              <DatePickerInput
                placeholder="Start Date"
                value={date}
                reset={false}
                onSelect={(val) => setDate(val)}
              />
            </Div>
            <Div flex={1}>
              <DatePickerInput
                placeholder="End Date"
                value={end}
                reset={false}
                onSelect={(val) => {
                  setStart(date)
                  setEnd(val)
                }}
              />
            </Div>
            <TouchableOpacity
              style={{
                marginLeft: 10,
                padding: 5,
                borderRadius: 8,
                backgroundColor: !!filterVisible ? COLOR_PRIMARY : "",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => setFilterVisible(true)}
            >
              <Icon name="filter" fontFamily="Ionicons" fontSize={30} />
            </TouchableOpacity>
          </Div>
        ) : null}
      </>
    )
  }
  const newRenderStatus = ({ item }) => (
    <Div
      alignItems="center"
      w={widthPercentageToDP(25)}
      bg="white"
      rounded={8}
      mx={7}
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
      }}
    >
      <Div justifyContent="center" alignItems="center" my={10}>
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
          color={item.color}
          fontSize={16}
        />
        {/* <Div mx={8} h={8} w={8} rounded={8 / 2} bg={item.color} /> */}
        <Text allowFontScaling={false} fontSize={12} color="text">
          {item.status}
        </Text>
        <Text
          allowFontScaling={false}
          fontSize={12}
          color="text"
          fontWeight="500"
        >
          {!!item.total ? item.total : "0"}
        </Text>
      </Div>
    </Div>
  )
  const Header = () => (
    <>
      {userData?.type === "SALES" ? (
        <>
          {/* Deals */}
          <Div mx={10}>
            <DealComponent
              userData={userData}
              start={start}
              end={end}
              tipDeal={tipDeal}
            />
            <LeadComponent
              onActiveLeadPress={() =>
                navigation.navigate("SalesNewLeads", {
                  type: userData?.type,
                  id: userData?.id,
                  name: userData?.name,
                  startDate: !!start ? start : moment().startOf("month"),
                  endDate: !!end ? end : moment().endOf("month"),
                  isActive: 1,
                })
              }
              onPress={() =>
                navigation.navigate("SalesNewLeads", {
                  type: userData?.type,
                  id: userData?.id,
                  name: userData?.name,
                  startDate: !!start ? start : moment().startOf("month"),
                  endDate: !!end ? end : moment().endOf("month"),
                  isActive: 0,
                })
              }
              tooltipRef={tooltipRef}
              userData={userData}
              start={start}
              end={end}
              tipLead={tipLead}
              data={data}
              isLoading={isLoading}
              tipActiveLead={tipActiveLead}
            />
          </Div>
          <LeadStatusComponet tipLeadStatus={tipLeadStatus} status={status} />
          {/* Sales */}
          <Div row mt={8} justifyContent='space-between' mx={10}>
            <QuotationComponent
              start={start}
              end={end}
              tipQuotation={tipQuotation}
              onPress={() =>
                navigation.navigate("QuotationInside", {
                  type: userData?.type,
                  id: userData?.id,
                  name: userData?.name,
                  invoice_type: "quotation",
                  startDate: !!start ? start : moment().startOf("month"),
                  endDate: !!end ? end : moment().endOf("month"),
                })
              }
            />
              
            <Pressable
              onPress={() =>
                navigation.navigate("EstimatedInside", {
                  type: userData?.type,
                  id: userData?.id,
                  name: userData?.name,
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
                w={widthPercentageToDP(46)}
                rounded={4}
                p={10}
                bg="#3F82D9"
                justifyContent="center"
              >
                <Div row>
                  <Text
                    allowFontScaling={false}
                    fontSize={responsive(10)}
                    color="white"
                  >
                    Pipelines
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      if (tipEstimated.current) {
                        tipEstimated.current.show()
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
                    ref={tipEstimated}
                    mr={widthPercentageToDP(10)}
                    text={`Jumlah nominal estimasi yang diinput pada saat setiap follow up dibuat`}
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
                    ) : !!data?.estimation?.value ? (
                      formatCurrency(data?.estimation?.value)
                    ) : (
                      formatCurrency(0)
                    )}
                  </Text>
                  <Icon
                    ml={3}
                    name={
                      data?.estimation?.value < data?.estimation?.compare
                        ? "caretdown"
                        : "caretup"
                    }
                    fontFamily="AntDesign"
                    fontSize={8}
                    color={
                      data?.estimation?.value < data?.estimation?.compare
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
          </Div>
        </>
      ) : (
        <>
          {/* Deals */}
          <Div mx={10}>
            <DealComponent
              userData={userData}
              start={start}
              end={end}
              tipDeal={tipDeal}
            />
            <LeadComponent
              onActiveLeadPress={() =>
                navigation.navigate("SalesNewLeads", {
                  type: userData?.type,
                  id: userData?.id,
                  name: userData?.name,
                  startDate: !!start ? start : moment().startOf("month"),
                  endDate: !!end ? end : moment().endOf("month"),
                  isActive: 1,
                })
              }
              onPress={() =>
                navigation.navigate("SalesNewLeads", {
                  type: userData?.type,
                  id: userData?.id,
                  name: userData?.name,
                  startDate: !!start ? start : moment().startOf("month"),
                  endDate: !!end ? end : moment().endOf("month"),
                  isActive: 0,
                })
              }
              tooltipRef={tooltipRef}
              userData={userData}
              start={start}
              end={end}
              tipLead={tipLead}
              data={data}
              isLoading={isLoading}
              tipActiveLead={tipActiveLead}
            />
          </Div>
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
                  ml={10}
                  allowFontScaling={false}
                  fontSize={responsive(10)}
                  color="text"
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
              <Div my={10} alignItems="center">
                <FlatList
                  data={status}
                  contentContainerStyle={{ padding: 5 }}
                  horizontal
                  renderItem={newRenderStatus}
                />
              </Div>
            </Div>
          </Div>

          <Div row mx={15} mt={10} justifyContent="center">
            <QuotationComponent
              start={start}
              end={end}
              tipQuotation={tipQuotation}
            />

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
              bg="#3F82D9"
              justifyContent="center"
            >
              <Div row>
                <Text
                  allowFontScaling={false}
                  fontSize={responsive(10)}
                  color="white"
                >
                  Pipelines
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    if (tipEstimated.current) {
                      tipEstimated.current.show()
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
                  ref={tipEstimated}
                  mr={widthPercentageToDP(10)}
                  text={`Jumlah nominal estimasi yang diinput pada saat setiap follow up dibuat`}
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
                  ) : !!data?.estimation?.value ? (
                    formatCurrency(data?.estimation?.value)
                  ) : (
                    formatCurrency(0)
                  )}
                </Text>
                <Icon
                  ml={3}
                  name={
                    data?.estimation?.value < data?.estimation?.compare
                      ? "caretdown"
                      : "caretup"
                  }
                  fontFamily="AntDesign"
                  fontSize={8}
                  color={
                    data?.estimation?.value < data?.estimation?.compare
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
          </Div>
        </>
      )}
    </>
  )
  const [tempCompany] = useState<any>("")
  const FilterBase = () => (
    <Modal
      isVisible={filterVisible}
      h={heightPercentageToDP(50)}
      roundedTop={6}
      onBackdropPress={() => setFilterVisible(false)}
    >
      <Text ml={widthPercentageToDP(6)} mt={10} fontSize={responsive(12)}>
        Filter Base
      </Text>
      {userData?.type === "SUPERVISOR" ? (
        <>
          <Div mx={20}>
            <SelectChannel
              value={channel}
              title="Status"
              message="Please select a channel"
              onSelect={(value) => {
                setChannel(value)
                setFilterVisible(false)
              }}
              id={tempCompany}
            />
          </Div>
          <TouchableOpacity
            onPress={() => {
              setCompany("")
              setChannel("")
              setFilterVisible(false)
            }}
          >
            <LinearGradient
              style={{
                height: 40,
                justifyContent: "center",
                borderRadius: 4,
                width: widthPercentageToDP(30),
                marginLeft: widthPercentageToDP(7),
                marginTop: heightPercentageToDP(5),
              }}
              locations={[0.5, 1.0]}
              colors={["#1d4076", "#1F3B62"]}
            >
              <Text
                allowFontScaling={false}
                color="white"
                fontSize={14}
                textAlign="center"
              >
                Reset
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Div mx={20}>
            <SelectChannel
              value={channel}
              title="Status"
              message="Please select a channel"
              onSelect={(value) => {
                setChannel(value)
                setFilterVisible(false)
              }}
              id={tempCompany}
            />
          </Div>
          <TouchableOpacity
            onPress={() => {
              setCompany("")
              setChannel("")
              setFilterVisible(false)
            }}
          >
            <LinearGradient
              style={{
                height: 40,
                justifyContent: "center",
                borderRadius: 4,
                width: widthPercentageToDP(30),
                marginLeft: widthPercentageToDP(7),
                marginTop: heightPercentageToDP(5),
              }}
              locations={[0.5, 1.0]}
              colors={["#1d4076", "#1F3B62"]}
            >
              <Text
                allowFontScaling={false}
                color="white"
                fontSize={14}
                textAlign="center"
              >
                Reset
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </>
      )}
    </Modal>
  )
  // Modal
  const Comparison = () => (
    <Modal
      isVisible={modalVisible}
      h={heightPercentageToDP(60)}
      roundedTop={6}
      onBackdropPress={() => setModalVisible(false)}
    >
      <Div row justifyContent="space-between" p={20}>
        <Text
          allowFontScaling={false}
          fontWeight="bold"
          fontSize={responsive(14)}
        >
          Comparison
        </Text>
        <Button
          bg="#c4c4c4"
          h={35}
          w={35}
          rounded="circle"
          onPress={() => {
            setModalVisible(false)
          }}
        >
          <Icon color="black" name="close" />
        </Button>
      </Div>
      <Div
        row
        justifyContent="space-around"
        alignItems="center"
        borderColor="#c4c4c4"
        borderBottomWidth={1}
      >
        <Div row flex={3}>
          <Text
            textAlign="left"
            ml={heightPercentageToDP(2)}
            allowFontScaling={false}
            fontSize={responsive(12)}
          >
            Detail
          </Text>
        </Div>
        <Div flex={3}>
          <Text
            textAlign="right"
            mr={heightPercentageToDP(1)}
            allowFontScaling={false}
            fontSize={responsive(10)}
          >
            {moment(data?.compare_date?.start).format("DD MMM YYYY")}
          </Text>
          <Text
            textAlign="right"
            mr={heightPercentageToDP(1)}
            allowFontScaling={false}
            fontSize={responsive(10)}
          >
            {moment(data?.compare_date?.end).format("DD MMM YYYY")}
          </Text>
        </Div>
        <Div flex={3}>
          <Text
            textAlign="right"
            mr={heightPercentageToDP(1)}
            allowFontScaling={false}
            fontSize={responsive(10)}
          >
            {moment(data?.original_date?.start).format("DD MMM YYYY")}
          </Text>
          <Text
            textAlign="right"
            mr={heightPercentageToDP(1)}
            allowFontScaling={false}
            fontSize={responsive(10)}
          >
            {moment(data?.original_date?.end).format("DD MMM YYYY")}
          </Text>
        </Div>
      </Div>

      <Div
        alignItems="center"
        h={heightPercentageToDP(5)}
        row
        justifyContent="space-around"
        borderColor="#c4c4c4"
        borderBottomWidth={0.5}
      >
        <Div row flex={3}>
          <Text
            ml={heightPercentageToDP(2)}
            textAlign="left"
            allowFontScaling={false}
            fontSize={responsive(10)}
          >
            Deals
          </Text>
          <Icon
            ml={5}
            mt={2}
            name={
              data?.deals?.value < data?.deals?.compare
                ? "caretdown"
                : "caretup"
            }
            fontFamily="AntDesign"
            fontSize={10}
            color={
              data?.deals?.value < data?.deals?.compare ? "#F44336" : "#2DCC70"
            }
          />
        </Div>
        <Text
          allowFontScaling={false}
          flex={3}
          textAlign="right"
          mr={heightPercentageToDP(1)}
          fontSize={responsive(10)}
        >
          {!!data?.deals?.compare
            ? formatCurrency(data?.deals?.compare)
            : formatCurrency(0)}
        </Text>
        <Text
          allowFontScaling={false}
          flex={3}
          textAlign="right"
          mr={heightPercentageToDP(1)}
          fontSize={responsive(10)}
        >
          {!!data?.deals?.value
            ? formatCurrency(data?.deals?.value)
            : formatCurrency(0)}
        </Text>
      </Div>
      <Div
        alignItems="center"
        h={heightPercentageToDP(5)}
        row
        justifyContent="space-around"
        borderColor="#c4c4c4"
        borderBottomWidth={0.5}
      >
        <Div row flex={3}>
          <Text
            ml={heightPercentageToDP(2)}
            textAlign="left"
            allowFontScaling={false}
            fontSize={responsive(10)}
          >
            New Leads
          </Text>
          <Icon
            ml={5}
            mt={2}
            name={
              data?.new_leads?.value < data?.new_leads?.compare
                ? "caretdown"
                : "caretup"
            }
            fontFamily="AntDesign"
            fontSize={10}
            color={
              data?.new_leads?.value < data?.new_leads?.compare
                ? "#F44336"
                : "#2DCC70"
            }
          />
        </Div>
        <Text
          allowFontScaling={false}
          flex={3}
          textAlign="right"
          mr={heightPercentageToDP(1)}
          fontSize={responsive(10)}
        >
          {!!data?.new_leads?.compare ? data?.new_leads?.compare : "0"}
        </Text>
        <Text
          allowFontScaling={false}
          flex={3}
          textAlign="right"
          mr={heightPercentageToDP(1)}
          fontSize={responsive(10)}
        >
          {!!data?.new_leads?.value ? data?.new_leads?.value : "0"}
        </Text>
      </Div>
      <Div
        alignItems="center"
        h={heightPercentageToDP(5)}
        row
        justifyContent="space-around"
        borderColor="#c4c4c4"
        borderBottomWidth={0.5}
      >
        <Div row flex={3}>
          <Text
            ml={heightPercentageToDP(2)}
            textAlign="left"
            allowFontScaling={false}
            fontSize={responsive(10)}
          >
            Follow Up
          </Text>
          <Icon
            ml={5}
            mt={2}
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
        <Text
          allowFontScaling={false}
          flex={3}
          textAlign="right"
          mr={heightPercentageToDP(1)}
          fontSize={responsive(10)}
        >
          {!!data?.follow_up?.total_activities?.compare
            ? data?.follow_up?.total_activities?.compare
            : "0"}
        </Text>
        <Text
          allowFontScaling={false}
          flex={3}
          textAlign="right"
          mr={heightPercentageToDP(1)}
          fontSize={responsive(10)}
        >
          {!!data?.follow_up?.total_activities?.value
            ? data?.follow_up?.total_activities?.value
            : "0"}
        </Text>
      </Div>
      <Div
        alignItems="center"
        h={heightPercentageToDP(5)}
        row
        justifyContent="space-around"
        borderColor="#c4c4c4"
        borderBottomWidth={0.5}
      >
        <Div row flex={3}>
          <Text
            ml={heightPercentageToDP(2)}
            textAlign="left"
            allowFontScaling={false}
            fontSize={responsive(10)}
          >
            Quotation
          </Text>
          <Icon
            ml={5}
            mt={2}
            name={
              data?.quotation?.value < data?.quotation?.compare
                ? "caretdown"
                : "caretup"
            }
            fontFamily="AntDesign"
            fontSize={10}
            color={
              data?.quotation?.value < data?.quotation?.compare
                ? "#F44336"
                : "#2DCC70"
            }
          />
        </Div>
        <Text
          allowFontScaling={false}
          flex={3}
          textAlign="right"
          mr={heightPercentageToDP(1)}
          fontSize={responsive(10)}
        >
          {!!data?.quotation?.compare
            ? formatCurrency(data?.quotation?.compare)
            : formatCurrency(0)}
        </Text>
        <Text
          allowFontScaling={false}
          flex={3}
          textAlign="right"
          mr={heightPercentageToDP(1)}
          fontSize={responsive(10)}
        >
          {!!data?.quotation?.value
            ? formatCurrency(data?.quotation?.value)
            : formatCurrency(0)}
        </Text>
      </Div>
      <Div
        alignItems="center"
        h={heightPercentageToDP(5)}
        row
        justifyContent="space-around"
        borderColor="#c4c4c4"
        borderBottomWidth={0.5}
      >
        <Div row flex={3}>
          <Text
            ml={heightPercentageToDP(2)}
            textAlign="left"
            allowFontScaling={false}
            fontSize={responsive(10)}
          >
            Pipelines
          </Text>
          <Icon
            ml={5}
            mt={2}
            name={
              data?.estimation?.value < data?.estimation?.compare
                ? "caretdown"
                : "caretup"
            }
            fontFamily="AntDesign"
            fontSize={10}
            color={
              data?.estimation?.value < data?.estimation?.compare
                ? "#F44336"
                : "#2DCC70"
            }
          />
        </Div>
        <Text
          allowFontScaling={false}
          flex={3}
          textAlign="right"
          mr={heightPercentageToDP(1)}
          fontSize={responsive(10)}
        >
          {!!data?.estimation?.compare
            ? formatCurrency(data?.estimation?.compare)
            : formatCurrency(0)}
        </Text>
        <Text
          allowFontScaling={false}
          flex={3}
          textAlign="right"
          mr={heightPercentageToDP(1)}
          fontSize={responsive(10)}
        >
          {!!data?.estimation?.value
            ? formatCurrency(data?.estimation?.value)
            : formatCurrency(0)}
        </Text>
      </Div>
    </Modal>
  )

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          colors={[COLOR_PRIMARY]}
          tintColor={COLOR_PRIMARY}
          titleColor={COLOR_PRIMARY}
          title="Loading..."
          refreshing={isFetching}
          onRefresh={refetch}
        />
      }
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: "#E6F0FF" }}
      onScroll={(e) => {
        if (e.nativeEvent.contentOffset.y > 0)
          scrollY.setValue(e.nativeEvent.contentOffset.y)
      }}
      scrollEventThrottle={16}
    >
      {/* <TopSection userData={userData} channelData={channelData} /> */}
      <Image
        source={require("assets/TrekLogo.png")}
        style={{
          marginTop: heightPercentageToDP(1),
          width: 180,
          height: heightPercentageToDP(12),
          resizeMode: "contain",
          alignSelf: "center",
        }}
      />
      <FilterTarget />
      <Header />
      {userData.type === "SALES" ? (
        <>
          <Div mx={10}>
            <Button
              onPress={() => setModalVisible(true)}
              my={8}
              color="primary"
              fontWeight="bold"
              bg="white"
              borderWidth={1}
              borderColor="primary"
              rounded={6}
              w={widthPercentageToDP(95)}
              alignSelf="center"
            >
              Comparison
            </Button>
          </Div>
        </>
      ) : (
        <>
          <TouchableOpacity
            style={{
              padding: 8,
              borderRadius: 8,
              backgroundColor: COLOR_PRIMARY,
              marginHorizontal: widthPercentageToDP(2),
              marginVertical: heightPercentageToDP(1),
            }}
            onPress={() => navigation.navigate("Target", userData)}
          >
            <Text
              allowFontScaling={false}
              color="white"
              fontSize={14}
              textAlign="center"
            >
              See Detail
            </Text>
          </TouchableOpacity>
          <Div row justifyContent="space-between" mx={10}>
            <Button
              onPress={() => setModalVisible(true)}
              my={5}
              color="primary"
              py={9}
              fontWeight="700"
              bg="white"
              borderWidth={1}
              borderColor="primary"
              rounded={6}
              w={widthPercentageToDP(46)}
              alignSelf="center"
            >
              Comparison
            </Button>
            <Button
              onPress={() =>
                navigation.navigate("EstimatedInside", {
                  type: userData?.type,
                  id: userData?.id,
                  company_id: company,
                  startDate: !!start ? start : moment().startOf("month"),
                  endDate: !!end ? end : moment().endOf("month"),
                })
              }
              my={5}
              py={9}
              color="primary"
              fontWeight="700"
              bg="white"
              borderWidth={1}
              borderColor="primary"
              rounded={6}
              w={widthPercentageToDP(46)}
              alignSelf="center"
            >
              Brand
            </Button>
          </Div>
        </>
      )}
      <Div mt={10} />
      <BotSection
        userData={userData}
        data={[]}
        startDate={defaultStart}
        endDate={defaultEnd}
      />
      <Div>
        <Comparison />
        <FilterBase />
      </Div>
    </ScrollView>
  )
}

export default TargetScreen
