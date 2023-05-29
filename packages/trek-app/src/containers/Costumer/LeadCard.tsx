import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import {
  useNavigation,
  CompositeNavigationProp,
} from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import moment from "moment"
import React, { useState } from "react"
import {
  Linking,
  Platform,
  Pressable,
  TouchableOpacity,
  Image,
} from "react-native"
import { Swipeable } from "react-native-gesture-handler"
import { Avatar, Button, Div, Icon, Modal } from "react-native-magnus"

import Text from "components/Text"
import UserDropdownInput from "components/UserDropdownInput"

import { useAuth } from "providers/Auth"

import useLeadAssignMutation from "api/hooks/lead/useLeadAssignMutation"

import {
  CustomerStackParamList,
  MainTabParamList,
} from "Router/MainTabParamList"

import { responsive } from "helper"
import { COLOR_PRIMARY, COLOR_DISABLED } from "helper/theme"

import { getInitials, getFullName } from "types/Customer"
import { Lead, leadStatusConfig } from "types/Lead"
import { User } from "types/User"

import LeadBrand from "./LeadBrand"

type CurrentScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<CustomerStackParamList, any>,
  BottomTabNavigationProp<MainTabParamList>
>

type PropTypes = {
  lead: Lead
  isUnhandled?: boolean
}

export default ({ lead, isUnhandled = false }: PropTypes) => {
  const navigation = useNavigation<CurrentScreenNavigationProp>()
  const [assignModalOpened, setAssignModalOpened] = useState(false)
  const [assignLead, { isLoading }] = useLeadAssignMutation()
  const { userData } = useAuth()
  const [selectedBrand, setSelectedBrand] = useState([])
  const onHideModal = () => {
    setAssignModalOpened(false)
  }
  const openLink = (link) => {
    if (!!link) {
      Linking.canOpenURL(link)
        .then((supported) => {
          if (supported) {
            return Linking.openURL(link)
          } else {
            toast("App is not found")
          }
        })
        .catch((err) => toast("Something went wrong"))
    }
  }
  const LeftActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 0.7],
    })
    return (
      <>
        <Div
          p={20}
          bg="#2DCC70"
          ml={8}
          justifyContent="center"
          mb={10}
          roundedBottomLeft={8}
          roundedTopLeft={8}
          borderBottomWidth={0.8}
        >
          <TouchableOpacity
            onPress={() => {
              const phoneNumber = `+62${lead.customer.phone.slice(1)}`
              openLink(
                Platform.OS === "android"
                  ? `whatsapp://send?text=Halo&phone=${phoneNumber}`
                  : `https://api.whatsapp.com/send?text=Halo&phone=${phoneNumber}`,
              )
            }}
          >
            <Icon
              rounded="circle"
              name="logo-whatsapp"
              color="white"
              fontSize={48}
              fontFamily="Ionicons"
            />
          </TouchableOpacity>
        </Div>
        <Div
          p={20}
          bg="#0A72F6"
          justifyContent="center"
          mb={10}
          borderBottomWidth={0.8}
        >
          <TouchableOpacity
            onPress={() => {
              openLink(`mailto: ${lead.customer.email}`)
            }}
          >
            <Icon
              name="mail"
              color="white"
              fontSize={48}
              fontFamily="Ionicons"
            />
          </TouchableOpacity>
        </Div>
        <Div
          p={20}
          bg="#FFD13D"
          justifyContent="center"
          mb={10}
          borderBottomWidth={0.8}
        >
          <TouchableOpacity
            onPress={() => {
              openLink(`tel:${lead.customer.phone}`)
            }}
          >
            <Icon
              name="call"
              color="white"
              fontSize={48}
              fontFamily="Ionicons"
            />
          </TouchableOpacity>
        </Div>
      </>
    )
  }
  return (
    <TouchableOpacity
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
      onPress={() => navigation.navigate("CustomerDetail", { leadId: lead.id })}
    >
      <Swipeable
        leftThreshold={25}
        overshootFriction={4}
        friction={1}
        renderLeftActions={LeftActions}
        overshootRight={false}
      >
        <Div
          p={20}
          bg="white"
          mx={8}
          mb={10}
          rounded={8}
          borderBottomWidth={0.8}
          borderBottomColor={COLOR_DISABLED}
          overflow="hidden"
        >
          <Div row mb={10}>
            <Avatar
              bg={leadStatusConfig[lead.status].bg}
              color="white"
              size={responsive(32)}
              mr={10}
            >
              {getInitials(lead.customer)}
            </Avatar>
            <Div
              row
              flex={1}
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Div flex={1}>
                <Text
                  fontSize={14}
                  fontWeight="bold"
                  mb={5}
                  mr={5}
                  numberOfLines={1}
                >
                  {getFullName(lead.customer)}
                </Text>
                {!!lead.leadCategory && (
                  <Text fontWeight="bold" mt={5} numberOfLines={1}>
                    Customer from {lead.leadCategory.name}
                  </Text>
                )}
                {!!lead.leadSubCategory && (
                  <Text fontWeight="normal" mt={5} numberOfLines={1}>
                    {lead.leadSubCategory?.name}
                  </Text>
                )}
                {!lead.hasActivity && (
                  <Text fontWeight="bold" mt={5} numberOfLines={1} color="red">
                    No Activity Yet
                  </Text>
                )}
                {!!lead.hasActivity && (
                  <Text
                    fontWeight="normal"
                    mt={5}
                    numberOfLines={1}
                    color="#c4c4c4"
                  >
                    Last follow up{" "}
                    {moment(lead.updatedAt).format("DD-MM-YYYY ")}
                  </Text>
                )}
              </Div>
            </Div>
          </Div>
          <Div row justifyContent="space-between">
            <Div row alignItems="center" justifyContent="center">
              <Icon
                color="grey"
                name="person"
                fontSize={12}
                fontFamily="Ionicons"
                mr={5}
              />
              <Text color="grey">{lead.user.name}</Text>
            </Div>

            {isUnhandled && (
              <>
                <Button
                  bg="primary"
                  alignSelf="center"
                  onPress={() =>
                    userData?.type === "SALES"
                      ? setAssignModalOpened(true)
                      : assignLead({ id: lead.id })
                  }
                >
                  <Text fontWeight="bold" color="white">
                    {userData?.type === "SALES" ? "Take" : "Assign"}
                  </Text>
                </Button>
                <Modal
                  useNativeDriver
                  isVisible={assignModalOpened}
                  animationIn="slideInUp"
                  animationOut="slideOutDown"
                  onBackdropPress={onHideModal}
                  onModalHide={onHideModal}
                  onBackButtonPress={onHideModal}
                  h="40%"
                >
                  <Div h="100%" px={20} pt={20}>
                    <Text mb={10}>
                      Select Product Brand <Text color="red">*</Text>
                    </Text>
                    <Div h={50}>
                      <LeadBrand
                        leadId={lead.id}
                        value={selectedBrand}
                        onSelect={setSelectedBrand}
                      />
                    </Div>
                    <Button
                      bg="primary"
                      mx={20}
                      mt={10}
                      block
                      alignSelf="center"
                      disabled={!selectedBrand}
                      onPress={() => {
                        assignLead({ id: lead.id, brand: selectedBrand }, (x) =>
                          x.finally(() => {
                            onHideModal()
                          }),
                        )
                      }}
                      loading={isLoading}
                    >
                      <Text fontWeight="bold" color="white">
                        Take to my lead
                      </Text>
                    </Button>
                  </Div>
                </Modal>
              </>
            )}
            {!isUnhandled && (
              <Div row alignItems="center">
                <Image
                  source={require("../../assets/Loc.png")}
                  style={{ width: 11, resizeMode: "contain" }}
                />
                <Text
                  ml={5}
                  fontWeight="bold"
                  color="#1746A2"
                  numberOfLines={1}
                >
                  {lead.channel.name}
                </Text>
              </Div>
            )}
          </Div>
        </Div>
      </Swipeable>
    </TouchableOpacity>
  )
}
