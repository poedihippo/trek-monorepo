import axios from "axios"
import { Platform } from "react-native"

import { useAuth } from "providers/Auth"

import { CustomAxiosErrorType } from "api/errors"
import { V1Api } from "api/openapi"

let baseUrl = "https://trek.albatech.id"

const getHeader = (loggedIn: boolean, jwt: string) => ({
  headers: {
    ...(loggedIn
      ? { Authorization: `Bearer ${jwt}`, Accept: "application/json" }
      : {}),
    ...(Platform.OS === "web" ? { "X-Test": "true" } : {}),
  },
})

const errorFunction =
  (loggedIn: boolean, logout: CallableFunction) =>
  (error: any): Promise<CustomAxiosErrorType> => {
    return Promise.reject({ axiosError: error, loggedIn, logout })
  }

export const useAxios = () => {
  const {
    loggedIn,
    data: { jwt },
    onLogout,
  } = useAuth()

  const authHeader = getHeader(loggedIn, jwt)

  const instance = axios.create({
    baseURL: baseUrl + "/api/v1/",
    ...authHeader,
  })

  instance.interceptors.response.use(function (response) {
    return response
  }, errorFunction(loggedIn, onLogout))

  return instance
}

export default () => {
  const {
    loggedIn,
    data: { jwt },
    onLogout,
  } = useAuth()

  const authHeader = getHeader(loggedIn, jwt)

  const instance = axios.create({
    baseURL: baseUrl,
    ...authHeader,
  })

  instance.interceptors.response.use(function (response) {
    return response
  }, errorFunction(loggedIn, onLogout))

  return new V1Api(undefined, baseUrl, instance)
}
