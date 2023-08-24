import { useNavigation, useRoute } from "@react-navigation/native"
import React, { useEffect, useMemo, useState } from "react"
import { ScrollView, useWindowDimensions } from "react-native"
import Spinner from "react-native-loading-spinner-overlay"
import { Button, Div, Text } from "react-native-magnus"

import Image from "components/Image"
import UploadPicture, { ImageResultType } from "components/UploadPicture"

import useMultipleQueries from "hooks/useMultipleQueries"

import useActivityById from "api/hooks/activity/useActivityById"
import useActivityUploadImage from "api/hooks/activity/useActivityUploadImage"

import { COLOR_PRIMARY } from "helper/theme"

import { queryClient } from "../../query"

const UploadImageActivity = () => {
  const route = useRoute()
  const paymentId = route.params.id
  const { width: screenWidth } = useWindowDimensions()
  const navigation = useNavigation()
  const {
    queries: [{ data: activityData }],
    meta: {
      isError: activityIsError,
      isLoading: activityIsLoading,
      isFetching: activityIsFetching,
      refetch: activityRefetch,
      hasNextPage: activityHasNextPage,
      fetchNextPage: activityFetchNextPage,
      isFetchingNextPage: activityIsFetchingNextPage,
    },
  } = useMultipleQueries([useActivityById(paymentId)] as const)
  const [imageToUpload, setImageToUpload] = useState<ImageResultType | null>(
    null,
  )
  const [uploadImage, { isLoading: isMutationLoading }] =
    useActivityUploadImage()
  const previousImages = useMemo(
    () => (activityData ? activityData?.images?.map((x) => x.url) : []),
    [activityData],
  )
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => null,
      headerLeft: () => null,
    })
  }, [navigation])
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "white" }}
      // refreshControl={
      //   <RefreshControl
      //     colors={[COLOR_PRIMARY]}
      //     tintColor={COLOR_PRIMARY}
      //     titleColor={COLOR_PRIMARY}
      //     title="Loading..."
      //     refreshing={isManualRefetching}
      //     onRefresh={manualRefetch}
      //   />
      // }
    >
      <Spinner
        visible={isMutationLoading}
        textContent={"Uploading..."}
        textStyle={{
          color: "#FFF",
        }}
      />

      <Div bg="white" py={30} alignItems="center">
        {previousImages && previousImages.length > 0 && (
          <Div bg="white" mb={20} alignItems="center">
            <Text fontWeight="bold" fontSize={14} mb={20}>
              - Histori -
            </Text>
            {previousImages.map((image, i) => (
              <Image
                key={i}
                source={{ uri: image }}
                width={0.95 * screenWidth}
                scalable
              />
            ))}
          </Div>
        )}
        <Text fontWeight="bold" fontSize={14} textAlign="center">
          Upload Activity Picture:
        </Text>
        <UploadPicture
          value={imageToUpload}
          setValue={setImageToUpload}
          text="Attach Photo..."
          aspectRatio={[1, 1]}
        />
      </Div>

      <Div bg="white">
        <Button
          block
          bg="primary"
          mx={20}
          mb={10}
          alignSelf="center"
          onPress={() => {
            uploadImage({ imageUrl: imageToUpload.uri, paymentId }, (x) =>
              x.then(() => {
                queryClient.invalidateQueries(["activity", paymentId])
                setImageToUpload(null)
              }),
            )
          }}
        >
          <Text fontWeight="bold" color="white">
            Upload
          </Text>
        </Button>
        <Button
          block
          bg="white"
          mx={20}
          mb={10}
          alignSelf="center"
          borderWidth={1}
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: "CustomerDetail",
                  params: { leadId: activityData?.lead?.id },
                },
              ],
            })
          }
        >
          <Text fontWeight="bold" color="primary">
            Back to customer
          </Text>
        </Button>
      </Div>
    </ScrollView>
  )
}

export default UploadImageActivity
